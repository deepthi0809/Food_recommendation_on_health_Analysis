from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import json

app = Flask(__name__)
CORS(app)

# Database connection
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='deep08@*',
    database='food'
)
cursor = conn.cursor(dictionary=True)

# Signup route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data['name']
    email = data['email']
    password = generate_password_hash(data['password'])
    terms_accepted = data['termsAccepted']

    cursor.execute("SELECT * FROM users_data WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({'error': 'Email already exists'}), 400

    cursor.execute("INSERT INTO users_data (name, email, password, terms_accepted) VALUES (%s, %s, %s, %s)",
                   (name, email, password, terms_accepted))
    conn.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Add user details
@app.route('/api/users', methods=['POST'])
def add_user():
    user = request.json['userData']
    query = """
        INSERT INTO users (user_id, age, gender, weight, height, activity_level, dietary_preference, health_condition)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (user['userId'], user['age'], user['gender'], user['weight'], user['height'],
              user['activityLevel'], user['dietaryPreferences'], user['healthConditions'])
    cursor.execute(query, values)
    conn.commit()
    return jsonify({'message': 'User data saved successfully'})

# Add allergy info
@app.route('/api/allergies', methods=['POST'])
def add_allergy():
    allergy = request.json['allergyData']
    query = """
        INSERT INTO food_allergy (user_id, allergy_type, severity, diagnosed_on)
        VALUES (%s, %s, %s, %s)
    """
    values = (allergy['userId'], allergy['allergyName'], allergy['severityLevel'], allergy['diagnosedDate'])
    cursor.execute(query, values)
    conn.commit()
    return jsonify({'message': 'Allergy data saved successfully'})

# Save chatbot messages
@app.route('/api/chat', methods=['POST'])
def save_chat():
    data = request.json
    user_id = data['userId']
    query = data['query']
    response = data['response']
    cursor.execute("INSERT INTO chatbot_messages (user_id, user_query, bot_response) VALUES (%s, %s, %s)",
                   (user_id, query, response))
    conn.commit()
    return jsonify({'message': 'Chat saved successfully'})

# Food recipes fetch
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    cursor.execute("SELECT * FROM food_recipes")
    results = cursor.fetchall()
    if not results:
        return jsonify({'message': 'No recipes found.'}), 404
    return jsonify(results)

# Insert food recommendations
@app.route('/api/recommendations', methods=['POST'])
def insert_recommendations():
    insert_query = """
        INSERT INTO recommend (user_id, recommended_by, reason, food_name)
        SELECT 
            u.user_id,
            'ai' AS recommended_by,
            JSON_OBJECT('health_condition', u.health_condition, 'dietary_preference', u.dietary_preference) AS reason,
            f.food_name
        FROM users u
        JOIN diseases d ON u.health_condition = d.health_condition
        JOIN food_items f ON d.disease_id = f.disease_id
        WHERE u.dietary_preference = f.dietary_restriction
          AND NOT EXISTS (
              SELECT 1 
              FROM recommend r
              WHERE r.user_id = u.user_id
                AND r.food_name = f.food_name
                AND r.recommended_by = 'ai'
        )
    """
    cursor.execute(insert_query)
    conn.commit()
    return jsonify({'message': 'Recommendations inserted'})

# Get recommendations
@app.route('/api/getrecommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('userId')
    cursor.execute("SELECT food_name, reason FROM recommend WHERE user_id = %s", (user_id,))
    results = cursor.fetchall()
    if not results:
        return jsonify({'message': 'No recommendations found'}), 404
    return jsonify(results)

# KNN Clustering endpoint
@app.route('/api/cluster', methods=['GET'])
def cluster_users():
    cursor.execute("SELECT user_id, age, weight, height FROM users")
    users = cursor.fetchall()
    df = pd.DataFrame(users)

    if df.empty or df.shape[0] < 2:
        return jsonify({'message': 'Not enough valid data to perform clustering.'})

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(df[['age', 'weight', 'height']])

    kmeans = KMeans(n_clusters=3, random_state=42)
    df['cluster'] = kmeans.fit_predict(X_scaled)

    for index, row in df.iterrows():
        cursor.execute("UPDATE users SET cluster = %s WHERE user_id = %s", (int(row['cluster']), row['user_id']))

    conn.commit()
    return jsonify({'message': 'Clustering done successfully', 'clusters': df[['user_id', 'cluster']].to_dict(orient='records')})

# Run server
if __name__ == '__main__':
    app.run(port=3000, debug=True)

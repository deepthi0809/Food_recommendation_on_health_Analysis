# import mysql.connector
# import pandas as pd
# from sklearn.preprocessing import StandardScaler
# from sklearn.cluster import KMeans

# # Connect to the MySQL database
# conn = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="deep08@*",
#     database="food"
# )
# cursor = conn.cursor()

# # Fetch data from users table
# cursor.execute("SELECT user_id, age, weight, height FROM users")
# rows = cursor.fetchall()

# # Create a DataFrame
# df = pd.DataFrame(rows, columns=["user_id", "age", "weight", "height"])

# # ✅ Drop rows with missing or non-numeric values
# df = df[pd.to_numeric(df['age'], errors='coerce').notnull()]
# df = df[pd.to_numeric(df['weight'], errors='coerce').notnull()]
# df = df[pd.to_numeric(df['height'], errors='coerce').notnull()]
# df = df.astype({'age': 'float', 'weight': 'float', 'height': 'float'})

# # ✅ Check if there's enough data
# if df.empty or len(df) < 3:
#     print("❌ Not enough valid data to perform clustering.")
#     cursor.close()
#     conn.close()
#     exit()

# # Feature scaling
# features = df[['age', 'weight', 'height']]
# scaler = StandardScaler()
# scaled_features = scaler.fit_transform(features)

# # KMeans Clustering
# kmeans = KMeans(n_clusters=3, random_state=0)
# df['cluster'] = kmeans.fit_predict(scaled_features)

# # ✅ Add cluster_group column if not exists (one-time execution)
# try:
#     cursor.execute("ALTER TABLE users ADD COLUMN cluster_group INT")
#     conn.commit()
# except mysql.connector.Error as e:
#     if "Duplicate column name" not in str(e):
#         print("Error altering table:", e)

# # Update users table with cluster result
# for index, row in df.iterrows():
#     cursor.execute(
#         "UPDATE users SET cluster_group = %s WHERE user_id = %s",
#         (int(row['cluster']), int(row['user_id']))
#     )

# conn.commit()
# cursor.close()
# conn.close()
# print("✅ KMeans clustering done and saved to MySQL.")





# # import pandas as pd
# # from sklearn.preprocessing import StandardScaler
# # from sklearn.neighbors import NearestNeighbors
# # import mysql.connector

# # # Step 1: Connect to MySQL Database
# # conn = mysql.connector.connect(
# #     host="localhost",
# #     user="root",
# #     password="deep08@*",
# #     database="food"
# # )
# # cursor = conn.cursor()

# # # Step 2: Fetch User Data
# # cursor.execute("SELECT user_id, age, weight, height FROM users")
# # rows = cursor.fetchall()

# # # Step 3: Convert Data to DataFrame
# # df = pd.DataFrame(rows, columns=["user_id", "age", "weight", "height"])

# # # Step 4: Clean the data
# # df = df[pd.to_numeric(df['age'], errors='coerce').notnull()]
# # df = df[pd.to_numeric(df['weight'], errors='coerce').notnull()]
# # df = df[pd.to_numeric(df['height'], errors='coerce').notnull()]
# # df = df.astype({'age': 'float', 'weight': 'float', 'height': 'float'})

# # # Step 5: Normalize the Features
# # scaler = StandardScaler()
# # X_scaled = scaler.fit_transform(df[["age", "weight", "height"]])

# # # Step 6: Store Results in user_clusters Table
# # for i, neighbors in enumerate(indices):
# #     for n in neighbors[1:]:  # skip self
# #         uid = int(df.iloc[i]['user_id'])
# #         nid = int(df.iloc[n]['user_id'])
# #         cursor.execute(
# #             "INSERT INTO user_clusters (user_id, neighbor_id) VALUES (%s, %s)",
# #             (uid, nid)
# #         )

# # conn.commit()
# # conn.close()

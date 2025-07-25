// // clusterUsers.js
// const kmeans = require('ml-kmeans');

// // Simple encoders
// const encodeGender = g => g === 'male' ? 0 : g === 'female' ? 1 : 2;
// const encodeActivity = a => {
//   const levels = { sedentary: 0, light: 1, moderate: 2, active: 3 };
//   return levels[a.toLowerCase()] ?? 0;
// };
// const encodeDiet = d => d.includes('veg') ? 0 : d.includes('keto') ? 1 : d.includes('non') ? 2 : 3;
// const encodeHealth = h => h.includes('diabetes') ? 0 : h.includes('hypertension') ? 1 : 2;

// // Main function
// function clusterUsers(users, k = 3) {
//   // Convert each user to a numeric vector
//   const vectors = users.map(u => [
//     Number(u.age),
//     encodeGender(u.gender),
//     Number(u.height),
//     Number(u.weight),
//     encodeActivity(u.activityLevel),
//     encodeDiet(u.dietaryPreferences || ''),
//     encodeHealth(u.healthConditions || '')
//   ]);

//   const { clusters, centroids } = kmeans(vectors, k);

//   // Attach cluster ID to each user
//   const clusteredUsers = users.map((u, i) => ({
//     ...u,
//     cluster: clusters[i]
//   }));

//   return clusteredUsers;
// }

// module.exports = clusterUsers;

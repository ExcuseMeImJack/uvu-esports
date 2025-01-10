export async function fetchAllUsers() {
  try {
    // Send a GET request to the API route
    const response = await fetch('/api/users/');

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    // Parse the JSON response
    const users = await response.json();

    // Log the users to the console (you can render them in your component)
    console.log(users);

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

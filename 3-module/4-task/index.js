function showSalary(users, age) {
  let usersList = users.filter((user) => user.age <= age);
  let result = usersList
    .map (userSalary => `${userSalary.name}, ${userSalary.balance}`)
    .join('\n');
return result;
}

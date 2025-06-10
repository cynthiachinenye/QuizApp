let students = ["Cynthia", "Emeka", "Joy"];

students.forEach(student =>{

    console.log("welcome" + student + "!");
})

let scores = [10, 20, 30];
 let doubleScores = scores.map(function(score){
    return score * 2;
    
 })
 console.log(doubleScores);

 let tasks = [
  { name: "Wash dishes", done: true },
  { name: "Do homework", done: false },
  { name: "Cook food", done: true }
];

 const completed = tasks.filter(function(task){
   return task.done;
})
console.log(completed);

let items = [
  { name: "Pen", price: 10 },
  { name: "Bag", price: 100 },
  { name: "Phone", price: 500 }
];

const theItems = items.find(function(item){
    return (item.price > 100);
})
console.log(theItems);

let users = ["Ada", "Chioma", "Cynthia"];

console.log(users.includes("Cynthia"));

let messages = [];
messages.pop("hi");
messages.push("heloo dear");
console.log(messages)
const names = ["ali", "ayşe", "veli", "zeynep", "zehra", "şule", "şima"];
names.sort((x,y)=>y.localeCompare(x,"tr"));
console.log(names);
const city = "izmir";
console.log(city.toLocaleUpperCase("tr"));
let info = [
  {id: 'alsure', pw:'1234'},
  {id: 'alsue2000', pw:'2000'},
  {id: 'choco', pw: 'cho'},
  {id: 'yook', pw:'jungsoo'}
],

objIndex = info.findIndex((item => item.id == 'alsue2000'))

info[objIndex].pw = '3333'

console.log(info[objIndex].pw)


// //Log object to Console.
// console.log("Before update: ", myArray[objIndex])

// //Update object's name property.
// myArray[objIndex].name = "Laila"

// //Log object to console again.
// console.log("After update: ", myArray[objIndex])
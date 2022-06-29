const profileForm = document.getElementById('profileForm')
const renderProfile = document.getElementById('renderProfile')
  //event listeners 
profileForm.addEventListener('submit', handleSubmit)
//event handlers

  function handleSubmit(e) {
    e.preventDefault()
    let profile = {
      fName: e.target.fName.value,
      lName: e.target.lName.value,
      location: e.target.location.value,
      likes: 0,
      comments:""
      // image: e.target.image.value
    };
    renderProfiles(profile)
     postProfiles(profile);
  }
  // fetch request
  function getProfiles() {
    fetch("http://localhost:3000/profiles")
      .then(res => res.json())
      .then(profiles => profiles.forEach(profiles => {
      renderProfiles(profiles)
    }))
  }
  //fetch request to Postthe Data to the database 
 function postProfiles(profile) {
   fetch("http://localhost:3000/profiles", {
     method: "POST", 
     headers: {
       "Content-Type":"application/json"
     },
     body:JSON.stringify(profile)
   })
     .then(res => res.json())
     .then(profile=> {
     console.log(profile)
   })
 }
 //fetch request to update the Likes 
 function updateLikes(profiles) {
   fetch(`http://localhost:3000/profiles/${profiles.id}`, {
     method: "PATCH",
     headers: {
       "Content-Type":"application/json"
     },
     body:JSON.stringify(profiles)
   })
     .then(res => res.json())
   .then(profile=>console.log(profile))
 }
function renderProfiles(profiles) {
  let profileDiv = document.createElement('div')
  profileDiv.id="profileDIv"
  //  let profileImage = document.createElement('img')
  //  profileImage.src = `profiles.image`
   let profileName = document.createElement('p')
   profileName.textContent=`Name: ${profiles.fName}  ${profiles.lName}`
   let profileLocation = document.createElement('p')
   profileLocation.textContent = `Location: ${profiles.location}`
   let profileLikes = document.createElement('span')
   profileLikes.textContent= `${profiles.likes} likes`
   let likeButton = document.createElement('button')
   likeButton.type = "click"
   likeButton.textContent="LIKE💚"
   likeButton.id = "likeButton"
   likeButton.addEventListener('click', () => {
     profiles.likes += 1
     updateLikes(profiles)
   })
   let commentSection = document.createElement('div')
   commentSection.id="commentSection"
   let profileComment = document.createElement('span')
   profileComment.id = "comments"
   let commentInput = document.createElement('input')
  commentInput.id = "profileComment"
  commentInput.name = "comment"
   let reply = document.createElement('button')
  reply.textContent = "comment"
  let comments = document.createElement("p");
   comments.textContent = `${profiles.comments}`;
   
  //  renderProfile.appendChild(profileImage)
  renderProfile.appendChild(profileDiv);
   profileDiv.appendChild(profileName)
   profileDiv.appendChild(profileLocation)
   profileDiv.appendChild(likeButton)
   profileDiv.appendChild(profileLikes);
   profileDiv.appendChild(commentSection)
   commentSection.appendChild(commentInput)
   commentSection.appendChild(reply);
   commentSection.appendChild(comments)

 } 
 function initialize() {
   getProfiles()
 }
 initialize()
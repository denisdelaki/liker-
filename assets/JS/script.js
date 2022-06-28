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
      likes:0
      // image: e.target.image.value
    }
    renderProfiles(profile)
     postProfiles(profile);
  }
  // fetch request
  function getProfiles() {
    fetch("http://localhost:3000/profiles")
      .then(res => res.json())
      .then(profiles => profiles.forEach(profile => {
      renderProfiles(profile)
    }))
  }
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
 function renderProfiles(profiles) {
  //  let profileImage = document.createElement('img')
  //  profileImage.src = `profiles.image`
   let profileName = document.createElement('p')
   profileName.textContent=`Name: ${profiles.fName}  ${profiles.lName}`
   let profileLocation = document.createElement('p')
   profileLocation.textContent = `Location: ${profiles.location}`
   let profileLikes = document.createElement('span')
   profileLikes.textContent = `Likes: ${profiles.likes}`
   let likeButton = document.createElement('button')
   likeButton.type = "click"
   likeButton.textContent="LIKE💚"
   likeButton.id="likeButton"
  //  renderProfile.appendChild(profileImage)
   renderProfile.appendChild(profileName)
   renderProfile.appendChild(profileLocation)
   renderProfile.appendChild(profileLikes)
   profileLikes.prepend(likeButton)
 } 
 function initialize() {
   getProfiles()
 }
 initialize()
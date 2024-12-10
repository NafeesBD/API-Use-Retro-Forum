// *************** All Posts Start ***************

// posts & category api start
const postsFun = async (categoryId) => {

  // console.log(categoryId)

  // ****** Test Step 01 Start *****

  // if (categoryId) {
  //   console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryId}`)
  // }
  // else {
  //   console.log("https://openapi.programming-hero.com/api/retro-forum/posts")
  // }

  // ****** Test Step 01 Ent *****



  // ****** Test Step 02 Start *****

  // const testTernaryOperator1 = `${categoryId ? `?category=${categoryId}` : ''}`

  // console.log(testTernaryOperator1)


  // const testTernaryOperator2 = `https://openapi.programming-hero.com/api/retro-forum/posts${categoryId ? `?category=${categoryId}` : ''}`

  // console.log(testTernaryOperator2)


  // ****** Test Step 02 End *****



  // ** Final Fetch API Working And Dynamic Start **


  const apiUrl = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${categoryId ? `?category=${categoryId}` : ''}`)

  const data = await apiUrl.json();

  foreachArray(data.posts);


  // ** Final Fetch API Working And Dynamic End **
}

postsFun()

// posts & category api End


// Search By category function start
const searchFun = () => {
  const searchInput = document.getElementById("searchPosts").value;

  postsFun(searchInput)

  document.getElementById("searchPosts").value = ""
}
// Search By category function end


// posts api received start
const foreachArray = (fetchData) => {
  // console.log(fetchData)

  const parentCard = document.getElementById("post-container");
  parentCard.innerHTML = ""

  // posts api received forEach function start
  fetchData.forEach(postsData => {
    // console.log(postsData)

    const childCard = document.createElement("div");
    childCard.innerHTML = `
      <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
        <div class="indicator">
          <span class="indicator-item badge ${postsData.isActive == true ? 'bg-green-600' : 'bg-red-600'}"></span>
          <div class="avatar">
            <div class="w-24 rounded-xl">
              <img src="${postsData.image}" alt="Image loading" />
            </div>
          </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p>#${postsData.category}</p>
            <p>Author: ${postsData.author.name}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">
          ${postsData.title}
          </h3>
          <p class="opacity-40">
          ${postsData.description}
          </p>
          <hr class="border border-dashed border-gray-300" />
          <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
            <div class="flex gap-4">
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-comment-dots"></i>
                <p>${postsData.comment_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${postsData.view_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-clock"></i>
                <p>${postsData.posted_time} Min</p>
              </div>
            </div>
            <div class="opacity-100">
              <button id="addToList" onclick="cardButtonFun('${postsData.description}', '${postsData.view_count}')" class="addToList btn btn-circle bg-green-500 btn-sm">
                <i class="fa-solid fa-envelope-open text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    parentCard.appendChild(childCard)
  });
  // posts api received forEach function end

}
// posts api received end


// desCription & viewCount function start
const cardButtonFun = (desCription, viewCount) => {
  // console.log(desCription, viewCount)

  const parentReadContainer = document.getElementById("markAsReadContainer");

  const des_And_Count = document.createElement("div")
  des_And_Count.innerHTML = `

    <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
      <div class="lg:w-4/5 w-11/12">
        <p>
          ${desCription}
        </p>
      </div>
      <div class="lg:w-1/5 w-4/12 flex justify-end">
        <p>        
        <i class="fa-regular fa-eye"></i>
        ${viewCount}
        </p>
      </div>
    </div>

  `
  parentReadContainer.appendChild(des_And_Count);


  // Mark as read Counter Start

  const counter = document.getElementById("markAsReadCounter").innerText;
  // console.log(counter)
  const counterNumber = parseInt(counter);
  // console.log(counterNumber)
  const sum = counterNumber + 1;

  document.getElementById("markAsReadCounter").innerText = sum;

  // Mark as read Counter End


}
// desCription & viewCount function end


// *************** All Posts End ***************



// *************** Latest Posts Start ***************


// latest Posts Api Start
const latestPosts = async () => {
  const latestAPI = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');

  const data = await latestAPI.json();

  latestApiFun(data)
}

latestPosts()
// latest Posts Api End

// latest Posts Api Received Start
const latestApiFun = (latestData) => {
  // console.log(latestData)

  const latestParent = document.getElementById("latest-post-container")

  // latest Posts Api forEach start
  latestData.forEach(arrayData => {
    // console.log(arrayData)

    const latestCard = document.createElement("div")
    latestCard.innerHTML = `

      <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
        <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
          <img src="${arrayData.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
          <p class="opacity-50 text-start">
            <i class="fa-solid fa-calendar-days me-2"></i>
            ${arrayData.author.posted_date ? `${arrayData.author.posted_date}` : 'No Publish Date'}
          </p>
          <h2 class="card-title text-start">${arrayData.title}</h2>
          <p class="text-start">
          ${arrayData.description}
          </p>
          <div class="card-actions flex gap-5 items-center">
            <div class="avatar">
              <div class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="${arrayData.profile_image}" />
              </div>
            </div>
            <div>
              <h3 class="text-start font-extrabold">${arrayData.author.name}</h3>
              <p class="text-start opacity-60">${arrayData.author.designation ? `${arrayData.author.designation}` : 'Unknown'}</p>
            </div>
          </div>

        </div>
      </div>
    `
    latestParent.appendChild(latestCard)
  })
  // latest Posts Api forEach end
}
// latest Posts Api Received End

// *************** Latest Posts End ***************
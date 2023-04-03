const API_URL = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init';
const container = document.getElementById('posts-container');

createWidget(API_URL);

async function getData(apiURL){
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    }
    catch (error) {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
        console.log('Error fetching data:', error);
        return null;
    }
}

async function createWidget(apiURL){
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    const data = await getData(apiURL);
    if (!data || !data.list){
        return;
    }
    loader.classList.add('hidden');
    data.list.slice(0,6).forEach(post => {
        // div for each post
        const postElement = document.createElement('div');
        postElement.className = 'post';
        //image
        const linkImageElement = createImage(post);
        postElement.appendChild(linkImageElement);

        const infoElement = document.createElement('div');
        infoElement.className = 'info';

        //title
        const linkTitleElement = createTitle(post);
        infoElement.appendChild(linkTitleElement);

        //branding
        const linkBrandingElement = createBranding(post);
        infoElement.appendChild(linkBrandingElement);

        //category
        if(post.categories){
            const linkCategoryElement = createCategory(post);
            infoElement.appendChild(linkCategoryElement);
        }

        postElement.appendChild(infoElement);
        container.appendChild(postElement);
    })
}
function createImage(post){
    const linkImageElement = document.createElement('a');
    linkImageElement.setAttribute("href", post.url);
    linkImageElement.setAttribute("title", post.name);
    const imageElement = document.createElement('img');
    imageElement.setAttribute("src", post.thumbnail[0].url);
    linkImageElement.appendChild(imageElement);
    return linkImageElement;
}

function createTitle(post){
    const linkTitleElement = document.createElement('a');
    linkTitleElement.setAttribute("href", post.url);
    const titleElement = document.createElement('h3');
    titleElement.textContent = post.name;
    linkTitleElement.appendChild(titleElement);
    return linkTitleElement;
}

function createBranding(post){
    const linkBrandingElement = document.createElement('a');
    linkBrandingElement.setAttribute("href", post.url);
    linkBrandingElement.className='branding';
    const brandingElement = document.createElement('p');
    brandingElement.textContent = post.branding;
    linkBrandingElement.appendChild(brandingElement);
    return linkBrandingElement;
}

function createCategory(post){
    const linkCategoryElement = document.createElement('a');
    linkCategoryElement.setAttribute("href", post.url);
    linkCategoryElement.className='category';
    const categoryElement = document.createElement('p');
    categoryElement.textContent = post.categories[0];
    linkCategoryElement.appendChild(categoryElement);
    return linkCategoryElement;
}
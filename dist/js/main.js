const body = document.querySelector("body");
const hamburgerBtn = document.querySelector(".header__hamburger-toggle");
const hamburgerImg = document.querySelector(".header__hamburger");
const mobileNav = document.querySelector(".categories--nav");
const productsJSONData = getProducts();


//FUNCTIONS

async function getProducts() {
    let result = await fetch("../data.json");
    return result.json();
}

function handleHam() {
    body.classList.toggle("nav-is-open");
    mobileNav.classList.toggle("nav-is-open");
    hamburgerImg.classList.toggle("nav-is-open");
}

function handleProductLink(event) {
    let product = event.target.dataset.item;
    localStorage.setItem("product", product);
}

function createProductListeners() {
    const linkButtons = [...document.querySelectorAll('[data-link="product"]')];
    linkButtons.forEach((button) =>
        button.addEventListener("click", handleProductLink)
    );
}

//EVENT LISTENERS
hamburgerBtn.addEventListener("click", handleHam);

//PRODUCT PAGE

function createPicture(name, className, { mobile, tablet, desktop }) {
    return `<picture>
                        <source
                            media="(min-width: 1000px)"
                            srcset="
                                ${desktop}
                            "
                        />
                        <source
                            media="(min-width: 700px)"
                            srcset="
                                ${tablet}
                            "
                        />
                        <img
                            src="${mobile}"
                            alt="${name}"
                            class="${className}"
                        />
                    </picture>`;
}

function createGallery({ first, second, third }) {
    const galleryGrid = document.querySelector(".product__gallery-grid");
    let gallery =
        `<div class="product__gallery product__gallery-1">` +
        createPicture(
            "galleryimage",
            "product__gallery-image-1 product__gallery-image",
            first
        ) +
        `</div ><div class="product__gallery product__gallery-2">` +
        createPicture(
            "galleryimage",
            "product__gallery-image-2 product__gallery-image",
            second
        ) +
        `</div ><div class="product__gallery product__gallery-3">` +
        createPicture(
            "galleryimage",
            "product__gallery-image-3 product__gallery-image",
            third
        ) +
        `</div >`;
    
    galleryGrid.innerHTML = gallery
}

function createSuggestionCards(suggestions) {
    const suggestionsGrid = document.querySelector(".suggestions__grid");
    suggestions.forEach(
        ({ slug, name, image }) =>
            (suggestionsGrid.innerHTML +=
                `<div class="suggestions__card">` +
                createPicture(name, "suggestions__image", image) +
                `<h3 class="suggestions__h3">${name}</h3>
                        <a
                            href="./product.html"
                            class="btn btn--peach"
                            data-link="product"
                            data-item="${slug}"
                            >see product</a
                        >
                    </div>`)
    );
}

async function addToPage(item) {
    const productCard = document.querySelector(".product__card");
    const productInfo = document.querySelector(".product__info");
    const productItems = document.querySelector(".product__items");

    const products = await productsJSONData;
    let {
        name,
        image,
        description,
        features,
        gallery,
        includes,
        new: isNewItem,
        price,
        others,
        slug,
    } = products.find((obj) => obj.slug === item);
    features = features.split("\n");
    let newItem = isNewItem
        ? `<p class="overline text--peach product__overline">
                            new product
                        </p>`
        : "";
    let mainPicture = createPicture(name, "product__image", image);

    let imageContainer = `<div class="product__image-container">
                    ${mainPicture}
                </div>
                <div class="product__text-container">
                    <div class="product__text-block">
                        ${newItem}
                        <h1 class="product__h1">${name}</h1>
                        <p class="product__p">
                            ${description}
                        </p>
                        <p class="product__price">$&nbsp;${price.toLocaleString(
                            "en-US"
                        )}</p>
                        <div class="product__buttons">
                            <div class="product__amount-container">
                                <button class="product__subtract">-</button>
                                <p class="product__quantity">1</p>
                                <button class="product__add">+</button>
                            </div>
                            <button class="btn btn--peach add-to-cart">
                                add to cart
                            </button>
                        </div>
                    </div>
                </div>
        `;

    let items = includes.reduce((acc, { quantity, item }) => {
        return (
            acc +
            `<p class="product__item product__para">
                            <span class="product__item-number text--peach">
                                ${quantity}x
                            </span>
                            ${item}
                        </p>`
        );
    }, "");

    createSuggestionCards(others);
    createGallery(gallery);

    productCard.innerHTML = imageContainer;
    productInfo.innerHTML += `<p class="product__features product__para">${features[0]}<br/><br/>${features[2]}</p>`;
    productItems.innerHTML = items;

    createProductListeners();
}

document.addEventListener("DOMContentLoaded", () => {
    if (body.classList.contains("product-page")) {
        console.log("You're in the product page!");
        let productName = localStorage.getItem("product");

        // let products = async () => {
        //     let obj = await productsJSONData;
        //     console.log(obj);
        //     return obj;
        // };

        addToPage(productName);
    }

    createProductListeners();
});
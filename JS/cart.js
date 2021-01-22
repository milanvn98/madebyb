
   

//Open/Close Shopping Bag
const bag = document.querySelector('#cart_container'); 
function openBag() {
    bag.classList.add('show_cart');
};

window.addEventListener('click', function(e){ 
 const remItem = document.querySelectorAll(".danger-btn")
 const atcButton = document.querySelector('#atc')
    if (!document.getElementById('cart_container').contains(e.target) && !document.getElementById('shopping_bag').contains(e.target)){
    
        if (atcButton){
            if (atcButton.contains(e.target)){
                return
            }
        }
        bag.classList.remove('show_cart');   
    } 
    
});


//Add Item To Cart
const addToCartButtons = document.querySelectorAll('.add_to_cart_btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
})
      

function addToCartClicked(event){
    const btn = event.target
    const name = btn.parentElement.parentElement.getElementsByClassName('name')[0].innerHTML;    
    const item = allProducts.find(item => item.name === name);
    const price = item.amount
    const img = item.img
    const qty = btn.parentElement.parentElement.getElementsByClassName('qty_store')[0].value;
    const colour = btn.parentElement.parentElement.getElementsByClassName('colour')[0].value;
    item.colour = colour
    
    addToCart(name,price,img, qty, colour); 

    displayAdded();
}

function addToCart(name, price, img, qty, colour){
    //Check if Already in Cart
    const cartItemsName = document.querySelectorAll('.item_title');
    const cartItemsColour = document.querySelectorAll('.colour')
    const cartItemsValue = document.querySelectorAll('.qty')
   
    for (cartItem of cartItemsName){
        if (cartItem.innerHTML == name){
            for (colourItem of cartItemsColour){
                if (colourItem.innerHTML == colour){
                    for (valueItem of cartItemsValue){
                        if (cartItem.innerHTML == name && colourItem.innerHTML == colour){
                            const value = Number(valueItem.value)
                            valueItem.value = Number(qty) + value;
                            counter += Number(qty);
                            updateCartTotal()
                            return
                        }
                    }
                    return;
                }
            }
        }
    }
    const container = document.getElementById('items'); 
    const itemHTML = `
    <div class="bag_item_container flex">
					<div class="bag_image" style="flex:1">
						<img src="../${img}" style="width: 100%;">
					</div>
					<div class="bag_info" style="text-align: left; width: 100%; flex: 1">
                        <div class="flex disp1" style="justify-content: space-between">
                            <p style="padding-top: 12px" class="item_title">${name}</p>
                            <p style="font-weight: 300" class="price">£${price}</p>
                        </div>
                        <div class="flex disp2" style="justify-content: space-between; margin: 20px 0">
                            <p style="font-size: 18px; padding: 0px 0; margin-right: 20px; font-weight: 700;" class="colour">${colour}</p>
                            <div style="text-align: left;">
						        <label for="quantity">Qty:</label>
    					        <input type="number" value='${qty}' class="qty" style="width: 40px; height: 20px; padding: 2px;">
					        </div>
                        </div>
                        <div style="text-align: right" class="danger-btn_container">
                            <img src="../Images/x.png" class="danger-btn">
                        </div>
					</div>	
				</div>
    `
    container.insertAdjacentHTML('afterbegin', itemHTML);

    
     //Add to Buy List
    function searchAllProducts(){
        const fullItem = allProducts.find(item => item.name === name);
        if (fullItem){
            fullItem.quantity = Number(qty);
            fullItem.colour = colour
            const clone = JSON.parse(JSON.stringify(fullItem));
            itemsToBuy.push(clone);
        } else {
            setTimeout(() => {
                searchAllProducts()
            }, 300);
        }
    }

    searchAllProducts();

    //Add  QTY added to Counter
    counter += Number(qty);

    //Add Remove Functionality
    addRemoveListener();

    //Add Change Functionality
    addQTYListen();


    //Update Cart Total
    updateCartTotal();

}

function displayAdded(){
    //Say Added to Cart!
    const addedBanner = document.querySelector('#added_banner');
    addedBanner.classList.add('show_cart')
    openBag();
    setTimeout(function(){
        bag.classList.remove('show_cart');
        addedBanner.classList.remove('show_cart')
    }, 1500);
}




//Remove from Cart
function addRemoveListener(){  

    const removeCartItemButtons = document.getElementsByClassName('danger-btn');
    for (button of removeCartItemButtons){
        button.removeEventListener('click', removeItem);
        button.addEventListener('click', removeItem);
        
    }
}

  
function removeItem(event){
    const buttonClicked = event.target;

    //Remove qty from Counter
    const qty = buttonClicked.parentElement.parentElement.getElementsByClassName('qty')[0].value;
    counter -= Number(qty);

     //Remove from Buy List
     const name = buttonClicked.parentElement.parentElement.getElementsByClassName('item_title')[0].innerHTML;
     const remItem = itemsToBuy.findIndex(item => item.name === name);
     itemsToBuy.splice(remItem, 1);

     //Remove Container
     buttonClicked.parentElement.parentElement.parentElement.remove();

      //Update Cart Total
      updateCartTotal();

     //Update Storage
     sendToStorage()


};




//Add Quantity Changed Listener
function addQTYListen() {
 const quantities = document.querySelectorAll('.qty')
 for (qty of quantities){
     qty.removeEventListener('change', quantityChanged);
     qty.addEventListener('change', quantityChanged);

     qty.removeEventListener('click', getValue);
     qty.addEventListener('click', getValue);
 
 }};

function getValue(event){
    changeCounter = event.target.value;
 }

 function quantityChanged(event){
    const change = event.target

    //If qty goes below 0
    if (isNaN(change.value) || change.value <= 0){
        change.value = 1
    }

    //Change Item Qty in Buy List
    const itemName = change.parentElement.parentElement.parentElement.getElementsByClassName('item_title')[0].innerHTML;
    const changeItem = itemsToBuy.find(item => item.name == itemName);
    changeItem.quantity = change.value;

    //Change Counter
    counter += Number(change.value) - changeCounter

    //Update cart Total
    updateCartTotal();
 };




//Update Cart Total
function updateCartTotal(){
    const cartRows = document.querySelectorAll('.bag_item_container');
    let total = 0; 
    for (cartRow of cartRows){
        const price = cartRow.getElementsByClassName('price')[0].innerHTML.replace('£','')
        const quantity = cartRow.getElementsByClassName('qty')[0].value
        total += (price * quantity)
        const name = cartRow.getElementsByClassName('item_title')[0].innerHTML
        let changeItem = itemsToBuy.find(item => item.name === name);
        changeItem.quantity = Number(quantity)
    };
    total = Math.round(total * 100) /100
   
    document.querySelector('.total_amount').innerHTML = '£'+total
    
    refreshCounter();
    sendToStorage();
};


//Update Item Counter
const counterHTML = document.getElementById('counter');
const myItemsHTML = document.getElementById('my_items');


function refreshCounter(){
    if (counter < 0) counter = 0
    counter > 1 ? myItemsHTML.textContent = "My bag, " + counter + " Items." : myItemsHTML.textContent = "My bag, " + counter + " Item.";
    counterHTML.textContent = counter

}



var dog, happyDog, food, foodStock;
var database;
var dogSprite;

function preload()
{
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  // Linking the database to the project
  database = firebase.database();

  dogSprite = createSprite(250, 300, 30, 50);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
}


function draw() {  

  background(46, 139, 87);

  if (keyWentDown("UP_ARROW")){

    writeStock(food);
    dogSprite.addImage(happyDog);
  }

  drawSprites();

  fill("red");
  stroke("blue");
  text(food, 250, 50);

  text("Press Up arrow key to feed milk to the dog.", 100, 450);

}

function readStock(data){

  food = data.val();
}

function showError(){

  console.log("There is an error in the program.");
}

function writeStock(x){

  if (x > 0){

    x -= 1;
  }

  else{

    x = 0;
  }

  database.ref('/').update({

    'Food' : x
  })

}
import {MenuItem} from '../types';

export const menuItems: MenuItem[] = [
  {id:1,  name:'Mediterranean Breakfast Plate', ingredients:'Eggs, feta cheese, olives, tomatoes, cucumber, fresh bread',            prepTime:'15 min', price:9.50,  image:'MediterraneanBreakfastPlate', category:'Breakfast'},
  {id:2,  name:'Golden Omelette',               ingredients:'Eggs, cheese, mushrooms, spinach, herbs',                                prepTime:'12 min', price:8.00,  image:'GoldenOmelette',              category:'Breakfast'},
  {id:3,  name:'Fresh Croissant Set',           ingredients:'Butter croissants, seasonal jam, honey, fresh fruit',                    prepTime:'10 min', price:7.50,  image:'FreshCroissantSet',           category:'Breakfast'},
  {id:4,  name:'Yogurt Berry Bowl',             ingredients:'Greek yogurt, mixed berries, granola, honey',                            prepTime:'8 min',  price:6.80,  image:'YogurtBerryBowl',             category:'Breakfast'},
  {id:5,  name:'Avocado Toast',                 ingredients:'Toasted sourdough, avocado, poached egg, cherry tomatoes',               prepTime:'12 min', price:8.50,  image:'AvocadoToast',                category:'Breakfast'},
  {id:6,  name:'Grilled Sea Bass',              ingredients:'Sea bass fillet, lemon butter, herbs, seasonal vegetables',              prepTime:'25 min', price:18.00, image:'GrilledSeaBass',              category:'Main Courses'},
  {id:7,  name:'Truffle Chicken Fillet',        ingredients:'Chicken fillet, truffle cream sauce, mashed potatoes, herbs',            prepTime:'28 min', price:16.50, image:'TruffleChickenFillet',        category:'Main Courses'},
  {id:8,  name:'Beef Tenderloin',               ingredients:'Beef tenderloin, pepper sauce, roasted potatoes, vegetables',            prepTime:'32 min', price:24.00, image:'BeefTenderloin',              category:'Main Courses'},
  {id:9,  name:'Creamy Mushroom Risotto',       ingredients:'Arborio rice, mushrooms, parmesan, cream, herbs',                       prepTime:'25 min', price:14.00, image:'CreamyMushroomRisotto',       category:'Main Courses'},
  {id:10, name:'Seafood Linguine',              ingredients:'Linguine pasta, shrimp, mussels, calamari, tomato sauce',               prepTime:'27 min', price:17.50, image:'SeafoodLinguine',             category:'Main Courses'},
  {id:11, name:'Signature Club Sandwich',       ingredients:'Grilled chicken, bacon, lettuce, tomato, cheese, fries',                prepTime:'18 min', price:12.00, image:'SignatureClubSandwich',       category:'Main Courses'},
  {id:12, name:'Caesar Salad Deluxe',           ingredients:'Romaine lettuce, grilled chicken, parmesan, croutons, Caesar dressing', prepTime:'15 min', price:11.00, image:'CaesarSaladDeluxe',           category:'Main Courses'},
  {id:13, name:'Local Grilled Vegetables',      ingredients:'Zucchini, eggplant, peppers, mushrooms, olive oil, herbs',              prepTime:'18 min', price:10.50, image:'LocalGrilledVegetables',      category:'Main Courses'},
  {id:14, name:'Chocolate Fondant',             ingredients:'Dark chocolate, butter, eggs, vanilla ice cream',                       prepTime:'15 min', price:7.50,  image:'ChocolateFondant',            category:'Desserts'},
  {id:15, name:'Pistachio Cheesecake',          ingredients:'Cream cheese, pistachio cream, biscuit base, berries',                  prepTime:'10 min', price:7.00,  image:'PistachioCheesecake',         category:'Desserts'},
  {id:16, name:'Honey Baklava Plate',           ingredients:'Filo pastry, walnuts, honey syrup, cinnamon',                          prepTime:'8 min',  price:6.50,  image:'HoneyBaklavaPlate',           category:'Desserts'},
  {id:17, name:'Vanilla Berry Panna Cotta',     ingredients:'Vanilla cream, berry sauce, fresh berries, mint',                      prepTime:'10 min', price:6.80,  image:'VanillaBerryPannaCotta',      category:'Desserts'},
  {id:18, name:'Golden Citrus Lemonade',        ingredients:'Lemon, orange, sparkling water, mint, honey',                          prepTime:'5 min',  price:4.50,  image:'GoldenCitrusLemonade',        category:'Drinks'},
  {id:19, name:'Iced Coffee',                   ingredients:'Espresso, milk, ice, vanilla syrup',                                   prepTime:'6 min',  price:4.20,  image:'IcedCoffee',                  category:'Drinks'},
  {id:20, name:'Berry Mocktail',                ingredients:'Mixed berries, lime, mint, sparkling water',                           prepTime:'7 min',  price:5.00,  image:'BerryMocktail',               category:'Drinks'},
];

export const menuCategories: string[] = ['Breakfast', 'Main Courses', 'Desserts', 'Drinks'];

import app from "./firebaseInit";
import { getDatabase, set, ref, push, child } from "firebase/database";

const db = getDatabase();

const addProduct = async function (category, name, ings, desc, price, imgPath) {
  const dbRef = ref(db);
  const newProductRef = push(child(dbRef, `products/${category}/`));
  set(newProductRef, {
    id: newProductRef.key,
    name,
    ingredients: ings,
    description: desc,
    price,
    imagePath: imgPath,
  });

  console.log(`Product ${category} ${name} added, id: ${newProductRef.key}`);
};

// prettier-ignore
export const createDatabase = async function () {
  await addProduct("pizza", "Margarita", ["Sos pomidorowy", "Mozzarella", "Bazylia"], "Klasyczna pizza Włoska. Prosta ale pyszna!", 20.99, "path1.jpg");
  await addProduct("pizza", "Pepperoni", ["Pepperoni", "Mozzarella"], "Pizza z ostrym pepperoni i aromatyczną mozzarellą", 22.99, "path2.jpg");
  await addProduct("pizza", "Vegetariana", ["Sos pomidorowy", "Mozzarella", "Pieczarki", "Cebula", "Papryka", "Oliwki", "Szpinak"], "Pizza wegetariańska z bogatym zestawem warzyw", 24.99, "path3.jpg");
  await addProduct("pizza", "Capricciosa", ["Sos pomidorowy", "Mozzarella", "Szynka", "Pieczarki", "Oliwki", "Czosnek"], "Pizza Capricciosa z dodatkiem szynki i pieczarek", 23.99, "path4.jpg");
  await addProduct("pizza", "Quattro Formaggi", ["Sos pomidorowy", "Mozzarella", "Gorgonzola", "Parmezan", "Ementaler"], "Pizza z czterema rodzajami sera", 26.99, "path5.jpg");
  await addProduct("pizza", "Diavola", ["Sos pomidorowy", "Mozzarella", "Pepperoni", "Oliwki", "Czosnek", "Papryczki chili"], "Pizza Diavola - ostra i pikantna", 25.99, "path6.jpg");
  await addProduct("pizza", "Hawajska", ["Sos pomidorowy", "Mozzarella", "Szynka", "Ananas"], "Pizza Hawajska z sosem pomidorowym, mozzarellą, szynką i ananasem", 23.99, "path7.jpg");
  await addProduct("pizza", "Rustica", ["Sos pomidorowy", "Mozzarella", "Kurczak", "Pieczarki", "Cebula", "Papryka", "Ser Feta"], "Pizza Rustica z kurczakiem i warzywami", 26.99, "path8.jpg");
  await addProduct("pizza", "Prosciutto e Rucola", ["Sos pomidorowy", "Mozzarella", "Szynka Parmeńska", "Rukola"], "Pizza z szynką parmeńską i rukolą", 28.99, "path9.jpg");
  await addProduct("pizza", "Tricolore", ["Sos pomidorowy", "Mozzarella", "Pomidor", "Avocado", "Bazyliowy pesto"], "Pizza Tricolore z pomidorem, awokado i pesto bazyliowym", 27.99, "path10.jpg");

//Hamburgery
  await addProduct("burgers", "Classic Burger", ["Wołowina", "Ser", "Sałata", "Pomidor", "Sos majonezowy"], "Klasyczny burger z soczystą wołowiną", 18.99, "path21.jpg");
  await addProduct("burgers", "Cheeseburger", ["Wołowina", "Ser", "Sałata", "Pomidor", "Sos majonezowy"], "Burger z dodatkiem dodatkowego sera", 20.99, "path22.jpg");
  await addProduct("burgers", "Baconator", ["Wołowina", "Podwójny ser", "Boczek", "Cebula", "Sos BBQ"], "Burger z podwójnym serem, boczkiem, cebulą i sosem BBQ", 24.99, "path23.jpg");
  await addProduct("burgers", "Veggie Burger", ["Kotlet warzywny", "Ser", "Sałata", "Pomidor", "Sos tzatziki"], "Wegetariański burger z kotletem warzywnym", 16.99, "path24.jpg");
  await addProduct("burgers", "Spicy Chicken Burger", ["Kurczak panierowany", "Sałata", "Pomidor", "Papryczki jalapeno", "Sos pikantny"], "Pikantny burger z kurczakiem panierowanym", 22.99, "path25.jpg");
  await addProduct("burgers", "Double Cheeseburger", ["Wołowina", "Podwójny ser", "Sałata", "Pomidor", "Sos majonezowy"], "Podwójny cheeseburger z dodatkiem podwójnego sera", 26.99, "path26.jpg");
  await addProduct("burgers", "BBQ Bacon Burger", ["Wołowina", "Podwójny ser", "Boczek", "Cebula", "Sos BBQ"], "Burger z podwójnym serem, boczkiem, cebulą i sosem BBQ", 23.99, "path27.jpg");
  await addProduct("burgers", "Mushroom Swiss Burger", ["Wołowina", "Pieczarki", "Ser Swiss", "Sałata", "Sos czosnkowy"], "Burger z pieczarkami, serem Swiss i sosem czosnkowym", 25.99, "path28.jpg");
  await addProduct("burgers", "Guacamole Chicken Burger", ["Kurczak panierowany", "Guacamole", "Pomidor", "Sałata", "Sos majonezowy"], "Burger z kurczakiem panierowanym, guacamole i sosem majonezowym", 27.99, "path29.jpg");
  await addProduct("burgers", "Teriyaki Burger", ["Wołowina", "Sos teriyaki", "Sałata", "Pomidor", "Cebula", "Ser"], "Burger z sosem teriyaki, sałatą, pomidorem, cebulą i serem", 24.99, "path30.jpg");


//pasta
  await addProduct("pasta", "Spaghetti Bolognese", ["Spaghetti", "Sos mięsny", "Cebula", "Czosnek", "Pomidor"], "Klasyczne spaghetti z sosem bolognese", 16.99, "path161.jpg");
  await addProduct("pasta", "Fettuccine Alfredo", ["Fettuccine", "Śmietana", "Masło", "Czosnek", "Parmezan"], "Pyszne fettuccine z sosem Alfredo", 18.99, "path162.jpg");
  await addProduct("pasta", "Lasagne", ["Makaron", "Mięso mielone", "Sos pomidorowy", "Beszamel", "Ser"], "Domowa lasagne z warstwami mięsa i makaronu", 22.99, "path163.jpg");
  await addProduct("pasta", "Ravioli z Szpinakiem i Ricottą", ["Ravioli", "Szpinak", "Ricotta", "Parmezan", "Czosnek"], "Ravioli nadziewane szpinakiem i ricottą", 20.99, "path164.jpg");
  await addProduct("pasta", "Tagliatelle Carbonara", ["Tagliatelle", "Boczek", "Jajka", "Śmietana", "Parmezan"], "Tagliatelle z sosem carbonara", 17.99, "path165.jpg");
  await addProduct("pasta", "Penne all'Arrabbiata", ["Penne", "Sos pomidorowy", "Czosnek", "Oliwa z oliwek", "Papryczki chili"], "Penne z pikantnym sosem arrabbiata", 15.99, "path166.jpg");
  await addProduct("pasta", "Gnocchi z Sosem Pesto", ["Gnocchi", "Sos pesto", "Pomidory koktajlowe", "Bazylika", "Orzechy pinii"], "Gnocchi z sosem pesto i dodatkami", 19.99, "path167.jpg");
  await addProduct("pasta", "Cannelloni z Mięsem", ["Cannelloni", "Mięso mielone", "Sos pomidorowy", "Beszamel", "Ser"], "Cannelloni nadziewane mięsem w sosie pomidorowym", 21.99, "path168.jpg");
  await addProduct("pasta", "Farfalle z Kurczakiem i Brokułami", ["Farfalle", "Kurczak", "Brokuły", "Czosnek", "Śmietana"], "Farfalle z kurczakiem i brokułami w śmietanowym sosie", 18.99, "path169.jpg");
  await addProduct("pasta", "Tortellini z Serem i Szpinakiem", ["Tortellini", "Ser", "Szpinak", "Sos pomidorowy", "Parmezan"], "Tortellini z nadzieniem serowo-szpinakowym", 17.99, "path170.jpg");

//seafood
  await addProduct("seafood", "Pasta z Owoców Morza", ["Makaron", "Krewetki", "Małże", "Kalmary", "Czosnek"], "Pasta z owoców morza z makaronem", 23.99, "path141.jpg");
  await addProduct("seafood", "Risotto z Krewetkami", ["Ryż", "Krewetki", "Cebula", "Czosnek", "Pietruszka"], "Risotto z krewetkami i ziołami", 19.99, "path142.jpg");
  await addProduct("seafood", "Calamari Grilowane", ["Kalmary", "Oliwa z oliwek", "Czosnek", "Papryka", "Cytryna"], "Kalmary grilowane z aromatycznymi przyprawami", 18.99, "path143.jpg");
  await addProduct("seafood", "Sałatka z Owoców Morza", ["Krewetki", "Małże", "Kalmary", "Sałata", "Pomidor"], "Sałatka z owoców morza podawana z sałatą i pomidorem", 16.99, "path144.jpg");
  await addProduct("seafood", "Zupa Rybna z Małżami", ["Ryba", "Małże", "Marchew", "Por", "Ziemniaki"], "Zupa rybna z dodatkiem małży", 14.99, "path145.jpg");
  await addProduct("seafood", "Makaron z Krewetkami", ["Makaron", "Krewetki", "Czosnek", "Pietruszka", "Czerwony pieprz"], "Makaron z krewetkami i aromatycznymi przyprawami", 21.99, "path146.jpg");
  await addProduct("seafood", "Grillowane Owoce Morza", ["Krewetki", "Małże", "Kalmary", "Oliwa z oliwek", "Zioła"], "Grillowane owoce morza z dodatkiem ziół", 25.99, "path147.jpg");
  await addProduct("seafood", "Krewetki Curry", ["Krewetki", "Kokosowe mleko", "Curry", "Czosnek", "Cebula"], "Krewetki w sosie curry podane z kokosowym mlekiem", 20.99, "path148.jpg");
  await addProduct("seafood", "Pizza Frutti di Mare", ["Ciasto", "Sos pomidorowy", "Oliwa z oliwek", "Krewetki", "Małże"], "Pizza z owocami morza", 17.99, "path149.jpg");
  await addProduct("seafood", "Kalmary w Cieście", ["Kalmary", "Mąka", "Jajka", "Sól", "Czerwony pieprz"], "Kalmary w chrupiącym cieście", 16.99, "path150.jpg");

//desserts
  await addProduct("desserts", "Tiramisu", ["Biszkopty", "Kawa", "Mascarpone", "Cukier", "Kakao"], "Klasyczne tiramisu z biszkoptami, kawą i mascarpone", 15.99, "path121.jpg");
  await addProduct("desserts", "Sernik z Malinami", ["Ser", "Cukier", "Jajka", "Mąka", "Maliny", "Cynamon"], "Sernik z dodatkiem malin i cynamonu", 18.99, "path122.jpg");
  await addProduct("desserts", "Lody Waniliowe", ["Mleko", "Żółtka jaj", "Cukier", "Ekstrakt waniliowy", "Kremówka"], "Tradycyjne lody waniliowe", 10.99, "path123.jpg");
  await addProduct("desserts", "Panna Cotta z Truskawkami", ["Żelatyna", "Śmietana", "Cukier", "Truskawki", "Ekstrakt waniliowy"], "Panna cotta z sosem truskawkowym", 14.99, "path124.jpg");
  await addProduct("desserts", "Ciasto Czekoladowe", ["Mąka", "Cukier", "Kakao", "Czekolada", "Jajka", "Masło"], "Czekoladowe ciasto z kawałkami czekolady", 16.99, "path125.jpg");
  await addProduct("desserts", "Muffiny z Borówkami", ["Mąka", "Cukier", "Jogurt", "Jajka", "Borówki", "Proszek do pieczenia"], "Muffiny z dodatkiem świeżych borówek", 12.99, "path126.jpg");
  await addProduct("desserts", "Tort Truflowy", ["Herbatniki", "Czekolada", "Śmietana", "Masło", "Kakao", "Kawa"], "Tort truflowy z kakaowym kremem", 22.99, "path127.jpg");
  await addProduct("desserts", "Sorbet Cytrynowy", ["Cytryny", "Cukier", "Woda", "Białko jajka"], "Oszałamiający sorbet cytrynowy", 9.99, "path128.jpg");
  await addProduct("desserts", "Clafoutis z Wiśniami", ["Wiśnie", "Mąka", "Cukier", "Jajka", "Mleko", "Masło"], "Clafoutis z soczystymi wiśniami", 17.99, "path129.jpg");
  await addProduct("desserts", "Lody Czekoladowe", ["Mleko", "Cukier", "Kakao", "Śmietana", "Czekolada"], "Klasyczne lody czekoladowe", 11.99, "path130.jpg");

//hot drinks
  await addProduct("hotDrinks", "Espresso", ["Kawa ziarnista"], "Klasyczne espresso z intensywnym smakiem", 4.99, "path101.jpg");
  await addProduct("hotDrinks", "Cappuccino", ["Kawa ziarnista", "Mleko spienione", "Pianka mleczna"], "Cappuccino z równym udziałem kawy, mleka i pianki mlecznej", 6.99, "path102.jpg");
  await addProduct("hotDrinks", "Latte Macchiato", ["Kawa ziarnista", "Mleko spienione", "Karmel"], "Latte macchiato z karmelową nutą", 7.99, "path103.jpg");
  await addProduct("hotDrinks", "Herbata Earl Grey", ["Herbata Earl Grey", "Cytryna", "Cukier"], "Herbata czarna z nutą bergamotki", 5.99, "path104.jpg");
  await addProduct("hotDrinks", "Mocha", ["Kawa ziarnista", "Gorąca czekolada", "Śmietana", "Czekolada"], "Mocha z połączenia kawy, gorącej czekolady i śmietany", 8.99, "path105.jpg");
  await addProduct("hotDrinks", "Herbata Chai Latte", ["Herbata Chai", "Mleko spienione", "Cynamon", "Goździki"], "Herbata Chai z mlekiem i przyprawami", 6.99, "path106.jpg");
  await addProduct("hotDrinks", "Americano", ["Kawa ziarnista", "Gorąca woda"], "Americano z kawy ziarnistej i gorącej wody", 5.99, "path107.jpg");
  await addProduct("hotDrinks", "Czekolada Mleczna", ["Czekolada", "Mleko", "Śmietana", "Cukier"], "Gorąca czekolada mleczna z dodatkiem śmietany", 7.99, "path108.jpg");
  await addProduct("hotDrinks", "Herbata Zielona", ["Herbata Zielona", "Miód", "Cytryna"], "Herbata zielona z dodatkiem miodu i cytryny", 5.99, "path109.jpg");
  await addProduct("hotDrinks", "Espresso Doppio", ["Podwójna porcja kawy ziarnistej"], "Podwójne espresso o intensywnym smaku", 6.99, "path110.jpg");

};

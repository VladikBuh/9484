import {Location} from '../types';

export const locations: Location[] = [
  {id:1,  name:'Gdansk Old Town',                coordinates:'54.3480, 18.6536', shortDescription:'Historic heart of Gdansk',
   paragraph1:'Gdansk Old Town is one of the most beautiful historic districts in Northern Europe. Colorful merchant houses, cobblestone streets, and centuries-old architecture create a unique atmosphere throughout the area. Visitors can explore charming cafés, boutiques, and cultural landmarks within walking distance.',
   paragraph2:'The district reflects the city\'s rich maritime heritage and vibrant trading history. Every corner offers opportunities for photography and sightseeing. It is considered the cultural and historical center of Gdansk.',
   image:'GdanskOldTown'},

  {id:2,  name:'Neptune Fountain',               coordinates:'54.3485, 18.6531', shortDescription:'Iconic city landmark',
   paragraph1:'The Neptune Fountain is one of the most recognizable symbols of Gdansk. Located in the heart of the city, the monument celebrates the region\'s strong connection to the sea and maritime trade. Visitors often gather here to admire the impressive sculpture and surrounding architecture.',
   paragraph2:'The fountain has become a favorite meeting point for tourists and locals alike. Its location provides easy access to many nearby attractions. The area is especially beautiful during the evening hours when illuminated.',
   image:'NeptuneFountain'},

  {id:3,  name:'St Mary\'s Church',              coordinates:'54.3493, 18.6525', shortDescription:'Largest brick church',
   paragraph1:'St. Mary\'s Church is one of the largest brick churches in the world and an architectural masterpiece. The impressive interior features historic artwork, intricate details, and centuries of religious heritage. Visitors can explore the vast halls and admire the unique Gothic design.',
   paragraph2:'For those seeking panoramic views, the church tower offers a memorable experience. The climb rewards visitors with breathtaking views over Gdansk and the Baltic coast. It remains one of the city\'s most visited landmarks.',
   image:'StMarysChurch'},

  {id:4,  name:'Motlawa River Promenade',        coordinates:'54.3512, 18.6580', shortDescription:'Scenic waterfront walk',
   paragraph1:'The Motława River Promenade is one of the most picturesque areas in Gdansk. Elegant waterfront restaurants, historic ships, and beautiful architecture line the riverbanks. Visitors can enjoy a relaxing stroll while taking in views of the city\'s historic skyline.',
   paragraph2:'The promenade is particularly popular during sunset when the water reflects the surrounding buildings. Numerous cafés and outdoor terraces create a lively atmosphere. It is an ideal destination for both sightseeing and relaxation.',
   image:'MotlawaRiverPromenade'},

  {id:5,  name:'European Solidarity Centre',     coordinates:'54.3613, 18.6491', shortDescription:'Modern history museum',
   paragraph1:'The European Solidarity Centre tells the story of Poland\'s democratic transformation and the Solidarity movement. Interactive exhibitions combine history, multimedia displays, and personal stories to create a memorable visitor experience. The modern architecture of the building itself is also a major attraction.',
   paragraph2:'Visitors can learn about events that shaped modern Europe. The museum offers a thoughtful and engaging journey through recent history. It is one of Gdansk\'s most important cultural institutions.',
   image:'EuropeanSolidarityCentre'},

  {id:6,  name:'Museum of the Second World War', coordinates:'54.3560, 18.6606', shortDescription:'World-class historical exhibits',
   paragraph1:'The Museum of the Second World War presents one of the most comprehensive exhibitions dedicated to the global conflict. Modern displays, artifacts, and multimedia presentations provide powerful insight into the events and consequences of the war. Visitors can explore detailed exhibits covering both military and civilian experiences.',
   paragraph2:'The museum combines historical accuracy with exceptional presentation quality. Its striking contemporary architecture makes it instantly recognizable. The experience is educational, immersive, and highly regarded internationally.',
   image:'MuseumOfTheSecondWorldWar'},

  {id:7,  name:'Westerplatte Memorial',          coordinates:'54.4061, 18.6670', shortDescription:'Historic coastal monument',
   paragraph1:'Westerplatte is the location where the first major battle of World War II began. Today, the site serves as an important memorial dedicated to courage, resilience, and remembrance. Visitors can explore the grounds while learning about its historical significance.',
   paragraph2:'The area combines history with beautiful coastal scenery. Walking paths connect various monuments and viewpoints throughout the site. It offers both educational value and peaceful surroundings.',
   image:'WesterplatteMemorial'},

  {id:8,  name:'Amber Sky Ferris Wheel',         coordinates:'54.3516, 18.6594', shortDescription:'Panoramic city views',
   paragraph1:'Amber Sky provides spectacular panoramic views of Gdansk from comfortable enclosed cabins. The observation wheel rises above the waterfront, offering unique perspectives of the city\'s historic landmarks and riverfront. Visitors can enjoy the experience throughout the day and evening.',
   paragraph2:'Night rides are especially popular due to the city\'s illuminated skyline. The attraction is suitable for visitors of all ages. It offers excellent photo opportunities from every direction.',
   image:'AmberSkyFerrisWheel'},

  {id:9,  name:'Oliwa Cathedral',                coordinates:'54.4108, 18.5602', shortDescription:'Famous organ concerts',
   paragraph1:'Oliwa Cathedral is renowned for its magnificent architecture and world-famous pipe organ. Visitors are often captivated by the impressive interior and beautiful decorative details. Regular organ performances create a memorable cultural experience.',
   paragraph2:'The cathedral combines spiritual heritage with artistic excellence. Its peaceful atmosphere attracts both tourists and locals. It remains one of the most important religious landmarks in the region.',
   image:'OliwaCathedral'},

  {id:10, name:'Oliwa Park',                     coordinates:'54.4096, 18.5587', shortDescription:'Elegant landscaped gardens',
   paragraph1:'Oliwa Park offers a peaceful retreat surrounded by beautifully maintained gardens and historic landscapes. Visitors can explore walking paths, decorative ponds, and seasonal flower displays. The park provides a relaxing escape from the city\'s busy streets.',
   paragraph2:'The grounds are ideal for leisurely strolls and outdoor photography. Historic elements blend seamlessly with natural beauty. It is one of the most charming green spaces in Gdansk.',
   image:'OliwaPark'},

  {id:11, name:'Sopot Pier',                     coordinates:'54.4453, 18.5705', shortDescription:'Europe\'s longest wooden pier',
   paragraph1:'Located in nearby Sopot, this famous wooden pier stretches far into the Baltic Sea and offers stunning coastal views. Visitors can enjoy fresh sea air while walking along one of Poland\'s most iconic waterfront attractions. The surrounding area features upscale restaurants, cafés, and beachside entertainment.',
   paragraph2:'The pier is a popular destination throughout the year. Its unique setting creates a memorable seaside experience. It is considered one of the highlights of the entire Tricity region.',
   image:'SopotPier'},

  {id:12, name:'Brzezno Beach',                  coordinates:'54.4215, 18.6264', shortDescription:'Popular Baltic coastline',
   paragraph1:'Brzeźno Beach is one of the most popular coastal destinations near Gdansk. Wide sandy shores and scenic walking paths make it ideal for relaxation and recreation. Visitors can enjoy swimming, sunbathing, or simply taking in the beauty of the Baltic Sea.',
   paragraph2:'The beach offers a welcoming atmosphere for families, couples, and solo travelers. Nearby restaurants and cafés provide convenient dining options. It is a perfect destination for a relaxing day by the water.',
   image:'BrzeznoBeach'},
];

export function getDailyLocation(): Location {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return locations[(dayOfYear - 1) % locations.length];
}

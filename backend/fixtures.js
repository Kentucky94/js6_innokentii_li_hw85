const mongoose = require('mongoose');
const nanoid = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for(let coll of collections){
    await mongoose.connection.db.dropCollection(coll.name);
  }

  await User.create({
    username: 'admin',
    password: 'admin123',
    token: nanoid(),
    role: 'admin'
  }, {
    username: 'user',
    password: '123',
    token: nanoid(),
    role: 'user'
  });

  const [lp, met, para] = await Artist.create({
    name: 'Linkin Park',
    photo: 'fixtures/lp.jpg',
    info: 'The first band I started listening to',
    isPublished: true
  }, {
    name: 'Metallica',
    photo: 'fixtures/met.jpeg',
    info: 'Almost 50 years on stage and still rocking!',
    isPublished: true
  }, {
    name: 'Paramore',
    photo: 'fixtures/paramore.jpg',
    info: 'Positive, sad and amazing!',
    isPublished: true
  });

  const [hybrid, meteora, ride, master, laughter] = await Album.create({
    title: 'Hybrid Theory',
    artist: lp,
    release_year: 2000,
    cover_image: 'fixtures/lp-hybrid.jpeg',
    isPublished: true
  }, {
    title: 'Meteora',
    artist: lp,
    release_year: 2003,
    cover_image: 'fixtures/lp-meteora.jpg',
    isPublished: true
  }, {
    title: 'Ride The Lightning',
    artist: met,
    release_year: 1984,
    cover_image: 'fixtures/met-ride.jpg',
    isPublished: true
  }, {
    title: 'Master Of Puppets',
    artist: met,
    release_year: 1986,
    cover_image: 'fixtures/met-master.jpg',
    isPublished: true
  }, {
    title: 'After Laughter',
    artist: para,
    release_year: 2017,
    cover_image: 'fixtures/paramore-hard.jpg',
    isPublished: true
  });

  await Track.create(
    {name: 'Papercut', album: hybrid, track_number: 1, duration: 3.05, isPublished: true},
    {name: 'One Step Closer', album: hybrid, track_number: 2, duration: 2.36, isPublished: true},
    {name: 'With You', album: hybrid, track_number: 3, duration: 3.23, isPublished: true},
    {name: 'Points Of Authority', album: hybrid, track_number: 4, duration: 3.20, isPublished: true},
    {name: 'Crawling', album: hybrid, track_number: 5, duration: 3.29, isPublished: true},
    {name: 'Foreword', album: meteora, track_number: 1, duration: 0.14, isPublished: true},
    {name: 'Don\'t Stay', album: meteora, track_number: 2, duration: 3.08, isPublished: true},
    {name: 'Somewhere I Belong', album: meteora, track_number: 3, duration: 3.34, isPublished: true},
    {name: 'Lying From You', album: meteora, track_number: 4, duration: 2.55, isPublished: true},
    {name: 'Hit The Floor', album: meteora, track_number: 5, duration: 2.44, isPublished: true},
    {name: 'Fight Fire With Fire', album: ride, track_number: 1, duration: 4.45, isPublished: true},
    {name: 'Ride The Lightning', album: ride, track_number: 2, duration: 6.37, isPublished: true},
    {name: 'For Whom THe Bell Tolls', album: ride, track_number: 3, duration: 5.10, isPublished: true},
    {name: 'Fade To Black', album: ride, track_number: 4, duration: 6.57, isPublished: true},
    {name: 'Trapped Under Ice', album: ride, track_number: 5, duration: 4.04, isPublished: true},
    {name: 'Battery', album: master, track_number: 1, duration: 5.12, isPublished: true},
    {name: 'Master Of Puppets', album: master, track_number: 2, duration: 8.35, isPublished: true},
    {name: 'The Thing That Should Not Be', album: master, track_number: 3, duration: 6.36, isPublished: true},
    {name: 'Welcome Home', album: master, track_number: 4, duration: 6.27, isPublished: true},
    {name: 'Disposable Heroes', album: master, track_number: 5, duration: 8.17, isPublished: true},
    {name: 'Hard Times', album: laughter, track_number: 1, duration: 3.02, isPublished: true},
    {name: 'Rose-Colored Boy', album: laughter, track_number: 2, duration: 3.32, isPublished: true},
    {name: 'Told YOu So', album: laughter, track_number: 3, duration: 3.08, isPublished: true},
    {name: 'Forgiveness', album: laughter, track_number: 4, duration: 3.39, isPublished: true},
    {name: 'Fake Happy', album: laughter, track_number: 5, duration: 3.55, isPublished: true},
  );

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();

  throw error;
});
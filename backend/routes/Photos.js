var express = require('express');
const axios = require('axios');
var router = express.Router();

  
  router.get('/', async function(req, res, next) {
    try {
      const filters = { title, 'album.title': albumTitle, 'album.user.email': userEmail, limit = 25, offset = 0 } = req.query;
  
      const photosRequest = await axios.get('https://jsonplaceholder.typicode.com/photos');
      const photos = photosRequest.data;
  
      const albumsRequest = await axios.get('https://jsonplaceholder.typicode.com/albums');
      const albums = albumsRequest.data;
  
      const usersRequest = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = usersRequest.data;
  
      const modifyPhoto = photos.map(photo => {
        const album = albums.find(album => album.id === photo.albumId);
        const user = users.find(user => user.id === album.userId);
        return {
          ...photo,
          album: {
            ...album,
            user: user
          }
        };
      });
      
      const filteredPhotos = modifyPhoto.filter(photo => {
        let matches = true;
    
        if (filters.title) {
          matches = matches && photo.title.includes(filters.title);
        }
    
        if (filters['album.title']) {
          matches = matches && photo.album.title.includes(filters['album.title']);
        }
    
        if (filters['album.user.email']) {
          matches = matches && photo.album.user.email === filters['album.user.email'];
        }
    
        return matches;
      });
    
  
      const start = parseInt(filters.offset);
      const end = start + parseInt(filters.limit);
      const paginatedPhotos = filteredPhotos.slice(start, end);
      res.json(paginatedPhotos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener la información');
    }
  });
router.get('/:id',async function(req, res, next) {
    try {
        const idPhoto = req.params.id;
    
        const photoRequest = await axios.get(`https://jsonplaceholder.typicode.com/photos/${idPhoto}`);
        const photo = photoRequest.data;
        const albumRequest = await axios.get(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);
        const album = albumRequest.data;
        const userRequest = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
        const user = userRequest.data;
    
        const modifyPhoto = {
          id: photo.id,
          title: photo.title,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
          album: {
            id: album.id,
            title: album.title,
            user: user,
          }
          
        };
    
        res.json(modifyPhoto);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la información');
      }
  });
  module.exports = router;

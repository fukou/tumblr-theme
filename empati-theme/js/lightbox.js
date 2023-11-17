function gatherData(images, arr) {
    for (let i = 0; i < images.length; i++) {
      let currentData = {
        "width": images[i].getAttribute('data-width'),
        "height": images[i].getAttribute('data-height'),
        "low_res": images[i].getAttribute('data-lowres'),
        "high_res": images[i].getAttribute('data-highres')
      };
      arr.push(currentData);
    }
  }
  function getIndex(elem) {
    let i = 0;
    while( (elem = elem.previousElementSibling) != null ) i++;
    return i;
  }
  function lightbox(elem) {
    let currentPhotoset = elem.parentNode;
    let photosetPhotos = currentPhotoset.getElementsByTagName('div');
    let data = [];
    gatherData(photosetPhotos, data);
    Tumblr.Lightbox.init(data, getIndex(elem) + 1);
  }
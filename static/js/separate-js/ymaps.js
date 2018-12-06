window.onload = function(){
    var containerMap = document.getElementById('YMapsID');
    var contactsSelect = document.querySelector('.ymap-select');
    var branchInformationContainer  = document.getElementById('branchInformationContainer');
    var ymapSelectBranch = document.getElementById('ymapSelectBranch');
    var ymapSelectContainer = document.getElementById('ymapSelectContainer');
    var myMap;
    var selectItemContainer = document.querySelectorAll('.ymap-select__list');

    var selectItemContainerDefault = document.querySelector('.ymap-select__list_default');
    var defaultItems = selectItemContainerDefault.querySelector('.ymap-select__option.ymap-select__option_default');
    var defaultItemBalloon = selectItemContainerDefault.querySelectorAll('.ymap-select__ballon');
    ymaps.ready(initMaps(defaultItems.dataset.city));

    var listDefaultItemBalloon = [];
    for(var i = 0; i < defaultItemBalloon.length; i++){
        initBalloon(defaultItemBalloon[i].dataset.coordinates, defaultItemBalloon[i]);
        let coordinates = defaultItemBalloon[i].dataset.coordinates;
        let name = defaultItemBalloon[i].querySelector('.ya-map__title');
        ymapSelectList(coordinates, name);
        listDefaultItemBalloon.push(createBranchDescriptions(defaultItemBalloon[i]));

    }
    listDefaultItemBalloon.forEach(function(item,i){
        let coordinates = defaultItemBalloon[i].dataset.coordinates;
        coordinates = coordinates.split(', ');
        coordinates[0] = +coordinates[0];
        coordinates[1] = +coordinates[1];

        item.addEventListener('click', function(e){
            if(e.target.classList.contains('ya-map__title')){
                myMap.setZoom(18);
                myMap.panTo(coordinates, { flying: false});
            }
        });
        item.addEventListener('toushstart', function(e){
            if(e.target.classList.contains('ya-map__title')){
                myMap.setZoom(18);
                myMap.panTo(coordinates, { flying: false});
            }
        });
    });

    function ymapSelectList(coordinates, name){
        var ymapSelectList = document.createElement('li');
        ymapSelectList.classList.add('ymap-select__list');
        ymapSelectList.setAttribute('data-coordinates', coordinates);
        ymapSelectList.innerHTML = '<span>'+name.innerHTML+'</span>';
        ymapSelectContainer.appendChild(ymapSelectList);
    }

    contactsSelect.addEventListener('click', function(e){
        changeOfCityCoordinates(e);
    });
    contactsSelect.addEventListener('toushstart', function(e){
        changeOfCityCoordinates(e);
    });
    function changeOfCityCoordinates(e){
        if(e.target.classList.contains('ymap-select__option')){
            clearMaps();
            clearBranchCreation();
            clearYmapSelectList();
            var coordinates = e.target.dataset.city;
            initMaps(coordinates);

            var itemBalloon = e.target.parentElement.querySelectorAll('.ymap-select__ballon');
            for(var i = 0; i < itemBalloon.length; i++){
                initBalloon(itemBalloon[i].dataset.coordinates, itemBalloon[i]);
                let coordinates = itemBalloon[i].dataset.coordinates;
                let content = createBranchDescriptions(itemBalloon[i]);
                let name = itemBalloon[i].querySelector('.ya-map__title');
                ymapSelectList(coordinates, name);
                coordinates = coordinates.split(', ');
                coordinates[0] = +coordinates[0];
                coordinates[1] = +coordinates[1];
                content.addEventListener('click', function(e){
                    if(e.target.classList.contains('ya-map__title')){
                        myMap.setZoom(18);
                        myMap.panTo(coordinates, { flying: false});
                    }
                });

            }
        }
    }

    ymapSelectBranch.addEventListener('click', function(e){
        branchCoordinateChange(e);
    });
    ymapSelectBranch.addEventListener('toushstart', function(e){
        branchCoordinateChange(e);
    });
    function branchCoordinateChange(e){
        selectItemContainer = document.querySelectorAll('.ymap-select__list');
        for(var i = 0; i < selectItemContainer.length; i++){
            if(selectItemContainer[i].contains(e.target)){
                var coordinates = selectItemContainer[i].dataset.coordinates;
                coordinates = coordinates.split(', ');
                coordinates[0] = +coordinates[0];
                coordinates[1] = +coordinates[1];
                myMap.setZoom(18);
                myMap.panTo(coordinates, { flying: false});
            }
        }
    }

    function createBranchDescriptions(content){
        var container = document.createElement('div');
        container.classList.add('col-md-6');
        container.classList.add('col-lg-3');
        container.innerHTML = content.innerHTML;
        branchInformationContainer.appendChild(container);
        return container;
    }

    function initMaps(coordinates, zoom) {
        var zoom = zoom;
        if(zoom == undefined) zoom = 14;
        var coordinates = coordinates.split(', ');
        myMap = new ymaps.Map("YMapsID", {
            center: [+coordinates[0], +coordinates[1]],
            zoom: zoom,
            controls: [],
            delay: 0
        });
        myMap.controls.add(
            new ymaps.control.ZoomControl()
        );
        myMap.behaviors.disable('scrollZoom');
    };

    function initBalloon(coordinates, content){
        var place;
        var coordinates = coordinates.split(', ');
        place = new ymaps.Placemark(coordinates, { // Координаты метки объекта
            balloonContent: content.innerHTML // Надпись метки
        }, {
            iconLayout: 'default#image',
            // Своё изображение иконки метки
            iconImageHref: "static/img/general/ic-map-marker.svg",
            // Размер мкетки
            iconImageSize: [40, 50],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-20, -25]
        });
        myMap.geoObjects.add(place);
    }

    function clearMaps(){
        containerMap.removeChild(containerMap.querySelector('ymaps'));
    }
    function clearYmapSelectList(){
        var selects = ymapSelectContainer.querySelectorAll('.ymap-select__list');
        for (let i = 0, len = selects.length; i < len; i++) {
            ymapSelectContainer.removeChild(selects[selects.length-1]);
            ymapSelectContainer = document.getElementById('ymapSelectContainer');
            selects = ymapSelectContainer.querySelectorAll('.ymap-select__list');
        }
    }
    function clearBranchCreation(){
        var mainContainer = document.querySelector('.row.vertical-gutter');
        var items = mainContainer.querySelectorAll('.col-md-6.col-lg-3');
        for(var i = 0, len = items.length; i < len; i++){
            mainContainer.removeChild(items[items.length-1]);
            mainContainer = document.querySelector('.row.vertical-gutter');
            items = mainContainer.querySelectorAll('.col-md-6.col-lg-3');
        }
    }

    contactsSelect.addEventListener('click', function(){
        touchContactsSelect();
    });
    contactsSelect.addEventListener('toushstart', function(){
        touchContactsSelect();
    });

    var ymapSelectContainer = ymapSelectBranch.querySelector('.ymap-select__container');
    var defaultTextList = ymapSelectBranch.querySelector('.ymap-select__default-text');
    var ymapSelectOptionContainer = contactsSelect.querySelector('.ymap-select__container');
    var defaultText = contactsSelect.querySelector('.ymap-select__default-text');

    function touchContactsSelect(){
        ymapSelectContainer.classList.remove('-show');
        defaultTextList.classList.remove('ymap-select__default-text_open');
        defaultTextList.classList.remove('ymap-select__default-text_color');

        var contactSelectOption = contactsSelect.querySelectorAll('.ymap-select__option');
        defaultText.classList.toggle('ymap-select__default-text_open');
        ymapSelectOptionContainer.classList.toggle('-show');
        for(var i = 0; i < contactSelectOption.length; i++){
            contactSelectOption[i].addEventListener('click', function(){
                defaultTextList.classList.remove('ymap-select__default-text_color');
                defaultTextList.innerHTML = defaultTextList.dataset.placeholder;
                defaultTextList.classList.remove('ymap-select__default-text_open');
                ymapSelectContainer.classList.remove('-show');

                defaultText.classList.add('ymap-select__default-text_color');
                defaultText.innerHTML = this.innerHTML;
            });
            contactSelectOption[i].addEventListener('toushstart', function(){
                defaultText.classList.add('ymap-select__default-text_color');
                defaultText.innerHTML = this.innerHTML;
            });
        }
    }
    ymapSelectBranch.addEventListener('click', function(){
        touchYmapSelectBranch();
    });
    ymapSelectBranch.addEventListener('toushstart', function(){
        touchYmapSelectBranch();
    });
    function touchYmapSelectBranch(){
        ymapSelectOptionContainer.classList.remove('-show');
        defaultText.classList.remove('ymap-select__default-text_open');
        defaultText.classList.remove('ymap-select__default-text_color');

        var ymapSelectList = ymapSelectBranch.querySelectorAll('.ymap-select__list');
        defaultTextList.classList.toggle('ymap-select__default-text_open');
        ymapSelectContainer.classList.toggle('-show');
        for(var i = 0; i < ymapSelectList.length; i++){
            ymapSelectList[i].addEventListener('click', function(){
                defaultTextList.classList.add('ymap-select__default-text_color');
                defaultTextList.innerHTML = this.innerHTML;
            });
            ymapSelectList[i].addEventListener('toushstart', function(){
                defaultTextList.classList.add('ymap-select__default-text_color');
                defaultTextList.innerHTML = this.innerHTML;
            });
        }
    }

    document.addEventListener('mousedown', function(e){
        hideSelectContainer(e);
    });
    document.addEventListener('toushstart', function(e){
        hideSelectContainer(e);
    });
    function hideSelectContainer(e){
        var condition = ymapSelectBranch.contains(e.target) || contactsSelect.contains(e.target);
        if(!condition){
            ymapSelectBranch.querySelector('.ymap-select__container').classList.remove('-show');
            contactsSelect.querySelector('.ymap-select__container').classList.remove('-show');
        }
    }
}

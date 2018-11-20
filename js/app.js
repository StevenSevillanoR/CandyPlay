$.noConflict();

jQuery(document).ready(function($){
	
	claro()
	rellenarCuadro()

	function claro(){
		$(".main-titulo").animate(
			{
				color: "#ffffff"
			},Math.random()*1000, 'linear', function(){
				oscuro()
			}
		)
	}

	function oscuro(){
		$(".main-titulo").animate(
			{
				color: "#DCFF0E"
			},Math.random()*2000, 'linear', function(){
				claro()
			}
		)
	}

	$(".btn-reinicio").click(function(){
		if($("button.btn-reinicio").text()=="Iniciar"){
			$("button.btn-reinicio").text("Reiniciar");
			//iniciarjuego();
			//$("#timer").timer();

			Example2.Timer.play();
		}else if($("button.btn-reinicio").text()=="Reiniciar"){
			$("button.btn-reinicio").text("Iniciar")
			Example2.resetCountdown();
		}
	})

	var Example2 = new (function() {
	    var $countdown,
	        $div, // Form used to change the countdown time
	        incrementTime = 70,
	        currentTime = 12000,
	        updateTimer = function() {
	            $countdown.html(formatTime(currentTime));
	            if (currentTime == 0) {
	                Example2.Timer.stop();
	                //timerComplete();
	                Example2.resetCountdown();
	                return;
	            }
	            currentTime -= incrementTime / 10;
	            if (currentTime < 0) currentTime = 0;
	        },
	        timerComplete = function() {
	        	Example2.Timer.stop()
	            alert('Example 2: Countdown timer complete!');
	        },
	        init = function() {
	            $countdown = $('#timer');
	            Example2.Timer = $.timer(updateTimer, incrementTime, false);
	            $div = $('.buttons');
	            $div.bind('submit', function() {
	                Example2.resetCountdown();
	                return false;
	            });
	        };
	    this.resetCountdown = function() {
	        var newTime = 12000 //parseInt($form.find('input[type=text]').val()) * 100;
	        if (newTime > 0) {currentTime = newTime;}
	        this.Timer.stop().once();
	    };
	    $(init)        
	});

	// Common functions
	function pad(number, length) {
	    var str = '' + number;
	    while (str.length < length) {str = '0' + str;}
	    return str;
	}
	function formatTime(time) {
	    var min = parseInt(time / 6000),
	        sec = parseInt(time / 100) - (min * 60),
	        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
	    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2); // + ":" + hundredths;
	}

	function checkTablero() {
    for (var i = 1; i < 8; i++) {
      var selector = '.col-' + i + '';
      var faltantes = 7- $(selector).children().length
      console.log(faltantes)
      if($(selector).children().length<7){
        for (var j = 0; j < faltantes; j++) {
          console.log($(selector)[0].children, $(selector).children().length)
          var aleatoria = Math.round(Math.random() * 3) + 1;
          $(selector).append('<img class=elemento src=image/' + aleatoria + '.png>');
        }
      }
    }
    asignarId()
		//rellenarCuadro();
  }
  
  function asignarId(){
    for(var i = 1; i<8;  i++){
      var selector = '.col-'+i+'';
      var hijos = $(selector).children();
      for (var j = 0; j < 7; j++) {
        hijos[j].id = "candy"+i+j;
        console.log(hijos[j].id)
      }
    }
  }

	function rellenarCuadro(){
		for(var i = 1; i<8;i++){
			var selector = '.col-'+i+'';
			for(var j=0;j<7;j++){
        console.log($(selector)[0].children, $(selector).children().length)  
        var aleatoria = Math.round(Math.random() * 3) + 1;
        $(selector).append('<img id="candy' + i + j + '" class=elemento src=image/' + aleatoria + '.png>');
      }
		}
		addCandyEvents()
	}

	//Evento click y drag sobre las imágenes
  	
  	function addCandyEvents(){
  		$("img")
	    .draggable({
	      containment:'.panel-tablero',	
	      droppable: 'img',
	      revert: true,
	      revertDuration: 500,
	      grid: [100, 100],
	      zIndex: 10, 
	      drag: constrainCandyMovement,
    	});
    	$('img').droppable({
    		drop: swapCandy
    	});
    	enableCandyEvents()
    	deleteCandys()
	}

	function constrainCandyMovement(event, candyDrag) {
    //console.log(event.target, candyDrag)
    candyDrag.position.top = Math.min(100, candyDrag.position.top);
    candyDrag.position.bottom = -Math.min(100, candyDrag.position.top);
    candyDrag.position.left = Math.min(100, candyDrag.position.left);
    candyDrag.position.right = -Math.min(100, candyDrag.position.left);
		/*if(candyDrag.position.left<0){
			if(candyDrag.position.top<0){
				candyDrag.position.top = 0;
				candyDrag.position.bottom = Math.min(100, candyDrag.position.top);
        candyDrag.position.left = Math.min(100, candyDrag.position.left);
        candyDrag.position.right = 0;
        console.log('left<0 y top<0')
			}else{
				candyDrag.position.top = Math.min(100, candyDrag.position.top);
				candyDrag.position.bottom = 0;
        candyDrag.position.left = Math.min(100, candyDrag.position.left);
        candyDrag.position.right = 0;
        console.log('left<0 y top>0')
			}
		}else{
      if (candyDrag.position.top < 0) {
        candyDrag.position.top = Math.min(100, candyDrag.position.top);
        candyDrag.position.bottom = 0;
        candyDrag.position.left = Math.min(100, candyDrag.position.left);
        candyDrag.position.right = 0;
        console.log('left>0 y top<0')
      } else {
        candyDrag.position.right = Math.min(100, candyDrag.position.left);
        candyDrag.position.bottom = Math.min(100, candyDrag.position.top);
        candyDrag.position.top = 0;
        candyDrag.position.left = 0;
        console.log('left>0 y top>0')
      }
		}*/
	}

	function disableCandyEvents() {
		$('img').draggable('disable');
		$('img').droppable('disable');
	}

	function enableCandyEvents() {
		$('img').draggable('enable');
		$('img').droppable('enable');
	}

	function swapCandy(event, candyDrag){
		var candyDraga = $(candyDrag.draggable);
		var dragSrc = candyDraga.attr('src');
    var candyDrop = $(this);
    var dropSrc = candyDrop.attr('src');
    
    if (candyDrop[0].id.substring(5) == (Number(candyDraga[0].id.substring(5)) + 1).toString()
        || candyDrop[0].id.substring(5) == (Number(candyDraga[0].id.substring(5)) + 10).toString() 
        || candyDrop[0].id.substring(5) == (Number(candyDraga[0].id.substring(5)) - 10).toString()
        || candyDrop[0].id.substring(5) == (Number(candyDraga[0].id.substring(5)) - 1).toString()
    ){
      candyDraga.attr('src', dropSrc);
      candyDrop.attr('src', dragSrc);
      console.log((Number(candyDraga[0].id.substring(5)) + 10).toString(), event, candyDraga[0].id.substring(5), candyDraga, candyDrop, dragSrc, dropSrc, candyDraga[0].id, candyDrop[0].id)

      setTimeout(function () {
        //checkTablero();

        if ($('img.delete').length === 0) {
          
          candyDraga.attr('src', dropSrc);
          candyDrop.attr('src', dragSrc);
        } else {
          updateMoves();
        }
      }, 500);
    }else{
      candyDraga.attr('src', dragSrc);
      candyDrop.attr('src', dropSrc);
      alert("No se pueden dropar estos elementos")
    }
    deleteCandys()
	}

	function deleteCandys(event, candy){

    console.log(event, candy)

    let arraysId=[];
    let eliminarVer = [{}];
    let eliminarHor = [];
    var l = 0;
    var column = $('[class^=col-]');
    console.log(column)

    //Validacion de columnas
		column.each(function(i, element){
      var k = 0;
      arraysId = [];

      console.log(i, column[i].childElementCount, element)
      
      for(var j=0; j<column[i].childElementCount-1; j++){
        if(k<6){
          k = j+1;
          console.log(k)
        }else{
          k = j;
          console.log(k)
        }
        
        if(column[i].children[j].attributes.src.value == column[i].children[k].attributes.src.value){
          if (arraysId[arraysId.length - 1] == column[i].children[j].id){
            arraysId.push(column[i].children[k].id)
          }else{
            arraysId.push(column[i].children[j].id, column[i].children[k].id)
          }
          if(arraysId.length >=3){
            if(eliminarVer[eliminarVer.length-1] != arraysId){
              eliminarVer.push(arraysId);
            }else{
              eliminarVer = eliminarVer;
            }
          }else{
            console.log("No hay nada para agregar")
          }
          console.log(arraysId, eliminarVer);
        }else{
          arraysId = [];
          console.log("No son iguales", arraysId);
        }
      }

			//var element = $(this.draggable);
			//var anterior = element.prev();
			//var siguiente = element.next();
			/*var eleSrc = element[i].atri;
			var antSrc = anterior.attr('src');
      var sigSrc = siguiente.attr('src');
      console.log(element, anterior, siguiente)*/
			/*if(element.attr('src') === anterior.attr('src') && element.attr('src') === siguiente.attr('src')){
				console.log('Los elementos '+eleSrc+' , '+antSrc+' y '+sigSrc+' son iguales')
				element.hide();
				anterior.remove();
				siguiente.remove();
			}else{
				alert('no hay matches')
			}*/
    });
    
    var m=10;

    //Validacion de filas
    for(var i=0; i < 7; i++){

      console.log(m,i)
      arraysId = [];
      var n = m;

      for (var j = 0; j < 7; j++){
        
        l = j;
        console.log(l, n)

        if (l < 6) {
          l = j + 1;
          console.log("Fila: " + i + "\n Candy: " + n, column[j].children[i].attributes.src, column[l].children[i].attributes.src)
        } else {
          //l = j;
          console.log(l)
        }

        if (column[j].children[i].attributes.src.value == column[l].children[i].attributes.src.value) {
          console.log(arraysId[arraysId.length - 1], column[j].children[i].id)
          
          if (arraysId[arraysId.length - 1] == column[j].children[i].id) {
            if(l<6){
              arraysId.push(column[l].children[i].id)
            }
          } else {
            if(l<6){
              arraysId.push(column[j].children[i].id, column[l].children[i].id)
            }else{
              arraysId.push(column[j].children[i].id)
            }
          }

          if (arraysId.length >= 3) {
            if (eliminarHor[eliminarHor.length - 1] != arraysId) {
              eliminarHor.push(arraysId);
            } else {
              eliminarHor = eliminarHor;
            }
          } else {
            console.log("No hay nada para agregar")
          }
          console.log(arraysId, eliminarHor);
        } else {
          arraysId = [];
          console.log("No son iguales", arraysId);
        }

        n=n+1;
      }
      m=m+10;
    }

    var elem = [];
    var eliminados = eliminarVer.concat(eliminarHor)
    eliminados.shift()

    eliminados.forEach(function(elemento, indice, array){
      console.log(elemento, indice, array)
      for(var i = 0; i<array[indice].length; i++){
        if(elem.includes(array[indice][i])){
          elem.push()
        }else{
          elem.push(array[indice][i])
        }
        console.log(elem)
      }
    })

    console.log(eliminados, elem)
    asignarDelete(elem)

  }

  function asignarDelete(arreglo){
    arreglo.forEach(function(element, i, array){
      console.log(element, i, array)
      $('#'+element+'').addClass('delete')
      console.log($('#' + element + '')[0]);
    })
    console.log(arreglo)
    setValidations()
  }

  function setValidations() {
    //columnValidation();
    //rowValidation();
    if ($('img.delete').length !== 0) {
      deletesCandyAnimation();
    }
  }
  
  function checkBoardPromise(result) {
    if (result) {
      checkTablero();
    }
  }

  function updateMoves() {
    var actualValue = Number($('#movimientos-text').text());
    var result = actualValue += 1;
    console.log(actualValue, result)
    $('#movimientos-text').text(result);
  }

  function deletesCandyAnimation(){
    animacionCandys()
    setTimeout(function(){
      $('img.delete').remove()
      checkTablero()
    }, 5000)
  }

  function animacionCandys(){
    animacion = function () {
      $('img.delete').fadeTo(500, .1)
        .fadeTo(500, 1);
    }
    setInterval(animacion, 1000);
  }

})



	

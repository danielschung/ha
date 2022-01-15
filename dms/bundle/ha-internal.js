//initialize function (https://www.dyn-web.com/tutorials/init.php)
function include(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

//circle button
function circleButton() {
  let button = document.querySelector('button.circle');
  if (button) { //add click listener to button.circle if exists
    button.addEventListener('click', circleActive);
  }
  function circleActive() {
    let button = event.currentTarget; //targets object where event(click) occurred
    let dropdown = button.nextElementSibling; // targets circle-dropdown if placed immediately after
    button.classList.toggle('active');
    dropdown.classList.toggle('active');
  }
}

//options button
function optionsButton() {
  let buttons = document.querySelectorAll('button.options');
  if (buttons.length > 0) {
    for (o = 0; o < buttons.length; o++) {
      buttons[o].addEventListener('click', optionsActive);
      function optionsActive() {
        let button = event.currentTarget;
        let dropdown = button.nextElementSibling;
        dropdown.classList.toggle('active');
        if ( dropdown.classList.contains('active') ) {
          let main = document.querySelector('body');
          main.addEventListener('click', hide);
          event.stopPropagation();
          function hide() {
            dropdown.classList.remove('active');
          }
          dropdown.addEventListener('click', prevent);
          function prevent(ev) {
            ev.stopPropagation();
          }
        }
      }
      let listTrigger = buttons[o].nextElementSibling.querySelector('li.list');
      if (listTrigger) {
        listTrigger.addEventListener('click', listToggle);
      }
      function listToggle() {
        let menu = listTrigger.nextElementSibling;
        let item = menu.firstElementChild.children;
        item[0].addEventListener('click', allClose);
        menu.classList.toggle('active');
      }
      function allClose() {
        listTrigger.parentElement.parentElement.classList.remove('active');
        listTrigger.nextElementSibling.classList.remove('active');
      }
    }
  }
}

//favorite button
function favoriteButton() {
  let buttons = document.querySelectorAll('button.favorite');
  if (buttons.length > 0) {
    for (b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener('click', function() {
        event.target.classList.toggle('active');
      });
      buttons[b].firstElementChild.addEventListener('click', function() {
        event.target.parentElement.click();
      });
    }
  }
}

//filter button
function filterButton() {
  let buttons = document.querySelectorAll('button.filter');
  if (buttons.length > 0) {
    for (f = 0; f < buttons.length; f++) {
      buttons[f].addEventListener('click', filterActive);
      let apply = buttons[f].nextElementSibling.children[2].children[1].children[1];
      apply.addEventListener('click', close);
      function filterActive() {
        let button = event.currentTarget;
        let dropdown = button.nextElementSibling;
        button.classList.toggle('active');
        dropdown.classList.toggle('active');
      }
      function close() {
        let button = event.currentTarget;
        let dropdown = button.parentElement.parentElement.parentElement;
        button.classList.toggle('active');
        dropdown.classList.toggle('active');
      }
    }
  }
}

//file input
function fileInput() {
  let files = document.querySelectorAll('input[type="file"]:not(.simple)');
  let fileName = 'Default'; //default filename
  let fileDiv = `<div class="container"><p>${fileName}</p><div><span>Upload File</span></div><div class="fileInput"></div></div>`; //div code
  if (files.length > 0) {
    for (i = 0; i < files.length; i++) {
      let file = files[i];
      let div = file.nextElementSibling; //select div.file of input
      div.innerHTML = fileDiv; //injects div.file to DOM
      div.addEventListener('click', upload);
      file.addEventListener('change', updateText);
      function upload() {
        file.click();
      }
      function updateText() {
        let data = file.value;
        let fileName = data.split(/(\\|\/)/g).pop(); //extracts file name from data
        div.firstChild.remove();
        let fileDiv = `<div class="container"><p>${fileName}</p><div><span>Upload File</span></div><div class="fileInput"></div></div>`; //updated div code
        div.innerHTML = fileDiv; //inject new div
      }
    }
  }
}

// checkbox and radio input
function checkboxRadioInput() {
  let checkbox = document.querySelectorAll('input[type="checkbox"]');
  let radio = document.querySelectorAll('input[type="radio"]');
  if (checkbox.length > 0) {
    for (i = 0; i < checkbox.length; i++) {
      let div = checkbox[i].nextElementSibling.nextElementSibling;
      div.addEventListener('click', check);
    }
  }
  if (radio.length > 0) {
    for (i = 0; i < radio.length; i++) {
      let div = radio[i].nextElementSibling.nextElementSibling;
      div.addEventListener('click', check);
    }
  }
  function check() {
    let div = event.currentTarget;
    let input = div.previousElementSibling.previousElementSibling;
    input.click();
  }
  //input
  const toggles = document.querySelectorAll('div.toggle');
  if (toggles.length > 0) {
    for (i = 0; i < toggles.length; i++) {
      let inject = `<div></div>`;
      toggles[i].innerHTML = inject;
    }
  }
}

// search
function searchBar() {
  const searchBars = document.querySelectorAll('input.search');
  if (searchBars.length > 0) {
    for (i = 0; i < searchBars.length; i++) {
      let search = searchBars[i];
      let clear = search.nextElementSibling;
      clear.addEventListener('click', clearText);
      function clearText() {
        search.focus();
        search.value = "";
      }
    }
  }
}

// select dropdowns
function dropdown() {
  const selectDivs = document.querySelectorAll('div.select');
  if (selectDivs.length > 0) {
    for (var s = 0; s < selectDivs.length; s++) {
      //initial creation of DOM element
      let injectLocation = selectDivs[s].children[2];
      let initialPlaceholder = selectDivs[s].children[1].children[0].textContent;
      let markup = `<div class="dropdown"> <p>${initialPlaceholder}</p><i></i> </div><div class="options"></div>`;
      injectLocation.innerHTML = markup;
      //elements
      let select = selectDivs[s].children[1]; //hidden select
      let dropdown = selectDivs[s].children[2].children[0]; //shown picker
      let placeholder = selectDivs[s].children[2].children[0].children[0]; //shown placeholder
      let divOptions = selectDivs[s].children[2].children[1]; //shown options panel
      //node elements
      let options = select.children;
      let divs = selectDivs[s].children[2].children[1].children;

      injectOptions(); //injects options into shown div
      enableExternal();
      watchOptions(); //watches options for mutation
      addListeners(); //adds click events to component
      
      function addListeners() {
        if (!select.disabled) {
          if (select.attributes['multiple']) {
            dropdown.addEventListener('click', showMultiple);
            enableClickMultiple();
          } else {
            dropdown.addEventListener('click', showSingle);
            enableClickSingle();
          }
        }
      }

      //creates toggled dropdowns
      function showSingle() {
        divOptions.style.display="block"; //makes shown options show on click
        let rootDiv = divOptions.parentElement.parentElement;
        if (divOptions.style.display="block") {
          let main = document.querySelector('body');
          main.addEventListener('click', hide);
          event.stopPropagation();
          function hide() {
            divOptions.style.display="none"; //makes drop hide when clicking page
          }
        }
      }
      function showMultiple() {
        divOptions.style.display="block"; //makes shown options show on click
        let rootDiv = divOptions.parentElement.parentElement;
        if (divOptions.style.display="block") {
          let main = document.querySelector('body');
          main.addEventListener('click', hide);
          event.stopPropagation();
          function hide() {
            divOptions.style.display="none"; //makes drop hide when clicking page
          }
          divOptions.addEventListener('click', prevent);
          function prevent(ev) {
            ev.stopPropagation();
          }
        }
      }

      //enables click events
      function enableClickSingle() {
        for (d = 0; d < divs.length; d++) {
          divs[d].addEventListener('click', function() {
            let text = event.target.textContent;
            let array = event.target.parentElement.children;
            placeholder.innerHTML = text; //changes placeholder text on click
            for (o = 0; o < options.length; o++) {
              let optionContent = options[o].textContent;
              if (text === optionContent) {
                options[o].selected = true;
              }
            }
          });
        }
      }
      function enableClickMultiple() {
        let selectedItems = [];

        for (d = 1; d < divs.length; d++) {
          divs[d].addEventListener('click', changeSelected);
        }

        function changeSelected() {
          let text = event.target.textContent;
          if (!selectedItems.includes(` ${text}`)) {
            selectedItems.push(' ' + text);
            event.target.classList.add('selected');
          } else {
            let index = selectedItems.indexOf(` ${text}`);
            selectedItems.splice(index, 1);
            event.target.classList.remove('selected');
          }

          //changes placeholder text on click
          if (selectedItems.length < 1) {
            placeholder.innerHTML = initialPlaceholder;
          } else {
            // enable next three lines to make placeholder count number of selected items and return "1 item(s) selected"
            // let len = selectedItems.length;
            // let newPlaceholder = `${len} items(s) selected`;
            // placeholder.innerHTML = newPlaceholder;
            placeholder.innerHTML = selectedItems; // delete this line when you enable above three lines
          }

          //passes value to hidden select
          for (d = 1; d < divs.length; d++) {
            if (divs[d].classList.contains('selected')) { //find selected divs
              //add selected attribute  
              let divText = divs[d].textContent; //read div textContent
              for (x = 1; x < options.length; x++) {
                let optionsText = options[x].textContent; //read options textContent
                if (optionsText === divText) {
                  options[x].setAttribute('selected', true);
                }
              }
              // optionsArray = Array.from(options);
            } else {
              //remove selected attribute
              let divText = divs[d].textContent; //read div textContent
              for (x = 1; x < options.length; x++) {
                let optionsText = options[x].textContent; //read options textContent
                if (optionsText === divText) {
                  options[x].removeAttribute('selected', true);
                }
              }
            }
          }
          console.log($('#multiple-dropdown').val()); // returns value with jquery
        }
      }

      //enable highlights when select is changed in html
      function enableExternal() {
        for (x = 1; x < options.length; x++) {
          if (options[x].selected) {
            let optionsText = options[x].textContent;
            for (d = 1; d < divs.length; d++) {
              let divText = divs[d].textContent;
              if (optionsText === divText) {
                divs[d].classList.add('selected');
              }
            }
          }
        }
      }

      function injectOptions() {
        if (divs.length === 0) { //case for initial injection
          for (let o = 0; o < options.length; o++) {
            let optionsText = options[o].textContent;
            let injected = `<div>${optionsText}</div>`;
            divOptions.insertAdjacentHTML('beforeEnd', injected);
          }
        } else if (divs.length > 0 && divs.length != options.length) { //case for manipulated select
          while(divs.firstChild) {
            divs.removeChild(divs.lastChild);
          }
          for (let o = 0; o < options.length; o++) {
            for (let x = 0; x < divs.length; x++) {
              if (!divs[o]) {
                let optionsText = options[o].textContent;
                let injected = `<div>${optionsText}</div>`;
                divOptions.insertAdjacentHTML('beforeEnd', injected);
              }
            }
          }
        }
      }

      //watches options for addition and removal of elements
      function callback(mutationList, observer) {
        mutationList.forEach((mutation) => {
          switch(mutation.type) {
            case 'childList':
              injectOptions();
              addListeners();
              break;
            case 'attributes':
              /* An attribute value changed on the element in
                 mutation.target; the attribute name is in
                 mutation.attributeName and its previous value is in
                 mutation.oldValue */
              break;
          }
        })
      }
      function watchOptions() {
        let observerOptions = {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true //Omit or set to false to observe only changes to the parent node.
        }
        let observer = new MutationObserver(callback);
        observer.observe(select, observerOptions);
      }

    }
  }
}

//tab switcher
function tab() {
  const tabs = document.querySelectorAll('div.tabs'); //nodelist
  if (tabs.length > 0) {
    for (t = 0; t < tabs.length; t++) { //loop through all tab components
      const tabHeaders = tabs[t].children; //define tab headers
      for (h = 0; h < tabHeaders.length; h++) { //loop through all headers
        if (tabHeaders[h].classList.contains('tab-header')) {
          tabHeaders[h].addEventListener('click', active);
        }
      }
    }
    function active() {
      let clicked = event.target;
      let siblings = clicked.parentElement.children;
      for (s = 0; s < siblings.length; s++) {
        if (siblings[s].classList.contains('active')) {
          siblings[s].classList.remove('active');
        }
      }
      clicked.classList.add('active');
    }
  }
}

//quantity input
function quantity() {
  const components = document.querySelectorAll('div.input.quantity');
  if (components.length > 0) {
    for (c = 0; c < components.length; c++) {
      const container = components[c];
      const input = components[c].getElementsByTagName('input')[0];
      const plus = components[c].getElementsByClassName('plus')[0];
      const minus = components[c].getElementsByClassName('minus')[0];

      input.addEventListener('change', prepare);

      function prepare() {
        value = parseInt(input.value); //convert to number

        if (value === 0) { //change value color when 0
          input.classList.add('placeholder');
        } else {
          input.classList.remove('placeholder');
        }
      }

      minus.addEventListener('click', numDown);
      function numDown() {
        if (input.value > 0) {
          input.value--;
          prepare();
        }
      }

      plus.addEventListener('click', numUp);
      function numUp() {
        input.value++;
        prepare();
      }
    }    
  }
}

//accordions
function accordion() {
  const accordions = document.querySelectorAll('div.accordion');
  if (accordions.length > 0) {
    for (let a = 0; a < accordions.length; a++) {
      accordions[a].addEventListener('click', toggle);
      function toggle() {
        accordions[a].classList.toggle('active');
      }

      const hidden = accordions[a].lastChild.previousElementSibling;

      hidden.addEventListener('click', prevent);
      function prevent() {
        event.stopPropagation();
      }

      // const children = hidden.children;
      // for (c = 0; c < children.length; c++) {
      //   children[c].addEventListener('click', prevent);
      //   function prevent() {
      //     event.stopPropagation();
      //   }
      // }
    }
  }
}






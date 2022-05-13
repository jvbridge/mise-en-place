// when form-select option is chosen

const selectedView = document.querySelector('.form-select');
const options = document.querySelector('option');

const response = await fetch("/api/repeated")
if(options.value === "1") {
    // display ALL repeats
    console.log('all repeats')
} else if (options.value === "2") {
    // display all daily repeats
    console.log('daily repeats')
} else if(options.value === "3") {
    // display all weekly repeats
    console.log('weekly repeats')
} else if(options.value === "4") {
    // display monthly repeats
    console.log('monthly repeats')
} else {
    console.log('No repeated events');
}


const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require("./lib/shapes")
const fs = require('fs')

async function svgBuilder() {

    const data = await inquirer
        .prompt([{
            type: 'input',
            name: 'text',
            message: 'Enter Text for Logo',
        },

        {
            type: 'input',
            name: 'textColor',
            message: 'Enter Text Color',
        },

        {
            type: 'list',
            name: 'shape',
            message: 'Enter Shape',
            choices: ['Circle', 'Square', 'Triangle']
        },

        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter Shape Color',
        }
        ])
    console.log(data);

    let shape;

    if (data.shape === "Circle") {
        shape = new Circle()
    }

    if (data.shape === "Triangle") {
        shape = new Triangle()
    }

    if (data.shape === "Square") {
        shape = new Square()
    }

    shape.setColor(data.shapeColor)
    const svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    ${shape.render()}
  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${data.textColor}">${data.text}</text>
  
  </svg>`
    
  fs.writeFileSync('logo.svg', svg)
}


svgBuilder()
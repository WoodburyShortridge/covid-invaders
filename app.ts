// Covid 19 vaccine themed space invaders
// 15x15 grid for the viruses
// 1x15 grid for vaccine needles


enum EventKeys {
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight'
}

enum ElementState {
    Active = 'active',
    Inactive = 'inactive',
}

interface styles {
    space: {}
    scene: {}
    virus: {
        active: {}
        inactive: {}
    }
    needle: {
        active: {}
        inactive: {}
    }
}

interface virus {
    pos: number
    element: HTMLElement
    state: ElementState
}

interface needle {
    pos: number
    element: HTMLElement
    state: ElementState
}

interface gameState {
    speed: number
    direction: 1 | -1
    offset: number
    walls: {
        left: boolean
        right: boolean
    },
    killed: number[]
}

interface vaccineState {
    pos: number
    interval: number | null
    speed: number
}

const styles: styles = {
    space: {
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    scene: {
        width: '375px',
        border: 'dashed white 1px',
        display: 'flex',
        flexWrap: 'wrap'
    },
    virus: {
        active: {
            width: '25px',
            height: '25px',
            visibility: 'visible',
            display: 'flex',
            justifyContent: 'center'
        },
        inactive: {
            width: '25px',
            height: '25px',
            visibility: 'hidden'
        }
    },
    needle: {
        active: {
            width: '25px',
            height: '80px',
            visibility: 'visible'
        },
        inactive: {
            width: '25px',
            height: '85px',
            visibility: 'hidden'
        }
    }
}

// styling helper
const setStyle = (element: HTMLElement, style: object): void => {
    Object.keys(style).forEach(key => {
        element.style[key] = style[key]
    })
}

// virus svg
const virusSvg: string = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.9212 11.0295C24.8687 10.4255 24.1598 10.1103 23.6608 10.5043L22.5316 11.3972C22.269 11.6073 21.9801 11.7122 21.665 11.7122L20.4308 11.7648C20.0893 11.791 19.8005 11.5285 19.7217 11.1871C19.5378 10.1367 19.1177 9.16493 18.54 8.32468C18.3299 8.0358 18.3561 7.64195 18.6188 7.40546L19.538 6.56502C19.7743 6.35491 20.0896 6.19738 20.4046 6.17118L21.7964 6.01365C22.4004 5.93488 22.7156 5.22578 22.2954 4.75318C21.9803 4.38553 21.6389 4.01787 21.2975 3.67644C20.956 3.335 20.5884 2.9937 20.2207 2.67848C19.7481 2.28464 19.0126 2.57352 18.9603 3.17748L18.8027 4.59547C18.7765 4.91054 18.6188 5.22578 18.4089 5.46208L17.5684 6.3813C17.3321 6.64398 16.9381 6.67018 16.6492 6.46007C15.8088 5.88233 14.8372 5.46211 13.7868 5.27838C13.4454 5.2258 13.1829 4.93693 13.2091 4.56929L13.2879 3.30882C13.2879 2.99374 13.4192 2.67851 13.6293 2.416L14.5221 1.31304C14.916 0.840444 14.6009 0.104954 13.997 0.0525732C13.5244 0.0263785 13.0254 0 12.5264 0C12.0275 0 11.5285 0.0261947 11.082 0.0525732C10.4781 0.105146 10.1628 0.814042 10.5569 1.31304L11.4497 2.44216C11.6598 2.70485 11.7647 2.99373 11.7647 3.30877L11.8173 4.54303C11.8435 4.88447 11.581 5.17333 11.2396 5.25212C10.1892 5.43603 9.21745 5.85607 8.3772 6.4338C8.08832 6.64391 7.69447 6.61772 7.45798 6.35504L6.61754 5.43581C6.40743 5.19951 6.2499 4.88424 6.2237 4.56921L6.06617 3.17739C5.9874 2.57344 5.2783 2.25817 4.8057 2.67838C4.43805 2.99346 4.07039 3.3349 3.72896 3.67634C3.38752 4.01778 3.04622 4.38543 2.731 4.75308C2.33716 5.22568 2.62604 5.96117 3.23 6.01355L4.64799 6.17109C4.96306 6.19728 5.2783 6.355 5.48843 6.56493L6.40765 7.40536C6.67033 7.64167 6.69653 8.03567 6.48642 8.32459C5.90868 9.16502 5.48846 10.1366 5.30473 11.187C5.25216 11.5284 4.96328 11.7909 4.59564 11.7647L3.30882 11.7121C2.99374 11.7121 2.67851 11.5808 2.416 11.3707L1.31304 10.4779C0.840444 10.084 0.104954 10.3991 0.0525729 11.003C0.0263782 11.4756 0 11.9746 0 12.4736C0 12.9725 0.0261944 13.4715 0.0525729 13.918C0.105146 14.5219 0.814042 14.8372 1.31304 14.4431L2.44216 13.5503C2.70485 13.3402 2.99373 13.2353 3.30877 13.2353L4.54303 13.1827C4.88447 13.1565 5.17333 13.419 5.25212 13.7604C5.43603 14.8108 5.85607 15.7825 6.4338 16.6228C6.64391 16.9117 6.61772 17.3055 6.35504 17.542L5.43581 18.3825C5.19951 18.5926 4.88424 18.7501 4.56921 18.7763L3.17739 18.9338C2.57344 19.0126 2.25817 19.7217 2.67838 20.1943C2.99346 20.5619 3.3349 20.9296 3.67634 21.271C4.01778 21.6125 4.38543 21.9538 4.75308 22.269C5.22568 22.6628 5.96117 22.374 6.01355 21.77L6.17109 20.352C6.19728 20.0369 6.355 19.7481 6.56493 19.5116L7.40536 18.5923C7.64167 18.3297 8.03567 18.3035 8.32459 18.5136C9.16503 19.0913 10.1366 19.5115 11.187 19.6953C11.5284 19.7478 11.7909 20.0367 11.7647 20.4044L11.7121 21.6912C11.7121 22.0063 11.5808 22.3215 11.3707 22.584L10.4779 23.687C10.084 24.1596 10.3991 24.895 11.003 24.9474C11.4756 24.9736 11.9746 25 12.4736 25C12.9725 25 13.4715 24.9738 13.918 24.9474C14.5219 24.8949 14.8372 24.186 14.4431 23.687L13.5503 22.5578C13.3402 22.2952 13.2353 22.0063 13.2353 21.6912L13.1827 20.457C13.1565 20.1155 13.419 19.8267 13.7604 19.7479C14.8108 19.564 15.7825 19.1439 16.6228 18.5662C16.9117 18.3561 17.3055 18.3823 17.542 18.645L18.3825 19.5642C18.5926 19.8005 18.7501 20.1158 18.7763 20.4308L18.9338 21.8226C19.0126 22.4266 19.7217 22.7418 20.1943 22.3216C20.5619 22.0065 20.9296 21.6651 21.271 21.3237C21.6125 20.9822 21.9538 20.6146 22.269 20.2469C22.6628 19.7743 22.374 19.0388 21.77 18.9864L20.3782 18.8289C20.0631 18.8027 19.7479 18.645 19.5377 18.4351L18.6185 17.5946C18.3558 17.3583 18.3296 16.9643 18.5397 16.6754C19.1175 15.835 19.5377 14.8634 19.7214 13.813C19.774 13.4716 20.0629 13.2091 20.4305 13.2353L21.6912 13.2879C22.0063 13.2879 22.3215 13.4192 22.584 13.6293L23.687 14.5221C24.1596 14.916 24.895 14.6009 24.9474 13.997C24.9736 13.5244 25 13.0254 25 12.5264C24.9738 12.0011 24.9476 11.5021 24.9212 11.0295Z" fill="#00FF47"/></svg>`

// needle svg
const needleSvg: string = `<svg width="25" height="80" viewBox="0 0 25 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.9675 76.1722H14.6342V68.8999H22.9675C23.9838 68.8999 25 68.1345 25 66.986V25.6459C25 24.4974 23.9838 23.732 22.9675 23.732H20.7316V18.7557C20.7316 17.7987 19.9188 16.8418 18.6991 16.8418H14.4307V1.91389C14.4307 0.765366 13.6179 0 12.3982 0C11.1786 0 10.3658 0.765366 10.3658 1.91389V16.8418H6.30085C5.28462 16.8418 4.26838 17.7987 4.26838 18.7557V23.732H2.03247C1.01623 23.732 0 24.4974 0 25.6459V46.4117V67.1774C0 68.3259 1.01623 69.0913 2.03247 69.0913H10.3658V76.1722H2.03247C0.812783 76.1722 0 76.9376 0 78.0861C0 79.2346 0.812783 80 2.03247 80H22.9664C24.186 80 24.9988 79.2346 24.9988 78.0861C24.9998 76.9376 24.1862 76.1722 22.9675 76.1722Z" fill="#E33AFF"/></svg>`

// vaccine svg
const vaccineSvg: string = `<svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.67567 12.4457L10.8043 9.03994C13.1278 5.32231 10.4551 0.500061 6.07107 0.500061C1.61305 0.500061 -1.04599 5.46852 1.42687 9.17781L3.60043 12.4381C3.62788 12.4793 3.65129 12.5231 3.67033 12.5687L6.14171 18.5001L8.61706 12.5592C8.63346 12.5198 8.65307 12.4819 8.67567 12.4457Z" fill="#00F0FF"/></svg>`

// scene dom setup
const app: HTMLElement = document.getElementById('app')
setStyle(app, styles.space)
const scene: HTMLElement = document.createElement('div')
setStyle(scene, styles.scene)
app.appendChild(scene)

// virus grid dimensions
const width: number = 15
const height: number = 15

const viruses: virus[] = [] // storage for all 225 potential virus positions
const initVirusPositions: number[] = [ // initial viruses
    0,1,2,3,4,5,6,7,8,9, // line 1
    15,16,17,18,19,20,21,22,23,24, // line 2
    30,31,32,33,34,35,36,37,38,39 // line 3
]

const gameState: gameState = {
    speed: 250,
    direction: 1,
    offset: -1,
    walls: {
        left: false,
        right: false
    },
    killed: []
}

const needles: needle[] = [] // storage for all 15 potential needle positions
const initNeedlePosition: number = 7

for (let i = 0; i < width * height; i++) { // setup for viruses
    const virus: HTMLElement = document.createElement('div')
    virus.innerHTML = virusSvg
    viruses.push({
        pos: i,
        element: virus,
        state: initVirusPositions.includes(i) ? ElementState.Active : ElementState.Inactive
    })
    scene.appendChild(virus)
}

const renderViruses = (): void => { // draw/style viruses
    viruses.forEach(virus => {
        switch (virus.state) {
            case ElementState.Active:
                setStyle(virus.element, styles.virus[ElementState.Active])
                break
            case ElementState.Inactive:
                setStyle(virus.element, styles.virus[ElementState.Inactive])
                break
            // case ElementState.Other:
            //     virus.element.innerHTML = vaccineSvg
            //     setStyle(virus.element, styles[`vir`])
            //     break
        }
    })
}

renderViruses()

for (let i = 0; i < width; i ++) { // setup for needles
    const needle: HTMLElement = document.createElement('div')
    needle.innerHTML = needleSvg
    needles.push({
        pos: i,
        element: needle,
        state: initNeedlePosition === i ? ElementState.Active : ElementState.Inactive
    })
    scene.appendChild(needle)
}

const renderNeedles = (): void => { // draw/style needles
    needles.forEach(needle => {
        setStyle(needle.element, styles.needle[needle.state])
    })
}

renderNeedles() // initial render

const aimNeedles = (event: KeyboardEvent): void => { // cb to move needle left/right
    const currentNeedle = needles.find(v => v.state === ElementState.Active)
    switch(event.key) {
        case EventKeys.ArrowRight:
            if (currentNeedle.pos !== width - 1) {
                const newNeedle: needle = needles.find(v => v.pos === currentNeedle.pos + 1)
                newNeedle.state = ElementState.Active
                currentNeedle.state = ElementState.Inactive
            }
            break
        case EventKeys.ArrowLeft:
            if (currentNeedle.pos !== 0) {
                const newNeedle: needle = needles.find(v => v.pos === currentNeedle.pos - 1)
                newNeedle.state = ElementState.Active
                currentNeedle.state = ElementState.Inactive
            }
            break
    }
    renderNeedles()
}
document.addEventListener('keydown', aimNeedles) // register cb


const gameOverCheck = (liveVirusPositions): boolean => {
    return liveVirusPositions.some(p => p > width * height)
}

const resetGame = (): void => {
    viruses.forEach((virus, i) => {
        virus.state = initVirusPositions.includes(i) ? ElementState.Active : ElementState.Inactive
        virus.pos = i
    })
    gameState.direction = 1
    gameState.offset = -1
    gameState.killed = []
}

const updateOffsetAndDirection = (): void => {
    const liveViruses: virus[] = viruses.filter(v => v.state === ElementState.Active)
    if (!liveViruses.length) {
        alert('You win :)')
        return resetGame()
    }
    gameState.walls.left = liveViruses[0].pos % width === 0 // if on left wall
    gameState.walls.right = liveViruses[liveViruses.length - 1].pos % width === width -1 // if on left wall

    // calculate offset and direction
    if (gameState.walls.right && gameState.direction === 1) {
        gameState.direction = -1
        gameState.offset += width
    } else if (gameState.walls.left && gameState.direction !== 1) {
        gameState.direction = 1
        gameState.offset += width
    } else {
        gameState.offset += gameState.direction
    }
}

const virusInvasion = (): void => { // interval to move viruses
    updateOffsetAndDirection()

    const liveVirusPositions: number[] = initVirusPositions.filter(v => !gameState.killed.includes(v)).map(v => v + gameState.offset)

    const over = gameOverCheck(liveVirusPositions)
    if (over) {
        alert('You loose :(')
        return resetGame()
    }

    viruses.forEach(virus => {
        virus.state = liveVirusPositions.includes(virus.pos) ? ElementState.Active : ElementState.Inactive
    })

    renderViruses()
}

setInterval(virusInvasion, gameState.speed) // register interval

const vaccinate = (event: KeyboardEvent): void => {
    if (event.key !== EventKeys.ArrowUp) return; // don't do anything
    const pos: number = needles.find(n => n.state === ElementState.Active).pos + (height * height);
    const vaccineState: vaccineState = {
        pos,
        interval: null,
        speed: 100
    };

    const advanceVaccine = (): void => {
        const prevVirusIndex: number = viruses.findIndex(v => v.pos === vaccineState.pos)
        const prevVirus = viruses[prevVirusIndex]
        if (prevVirus) prevVirus.state = ElementState.Inactive
        vaccineState.pos = vaccineState.pos - width
        const virusIndex: number = viruses.findIndex(v => v.pos === vaccineState.pos)
        const virus: virus = viruses[virusIndex]
        if (!virus) return clearInterval(vaccineState.interval)
        if (virus.state === ElementState.Active) {
            virus.state = ElementState.Inactive
            gameState.killed.push(virus.pos - gameState.offset)
            return clearInterval(vaccineState.interval)
        }
        virus.element.innerHTML = vaccineSvg
        virus.state = ElementState.Active
        renderViruses()
    }
    vaccineState.interval = setInterval(advanceVaccine, vaccineState.speed)
}

document.addEventListener('keydown', vaccinate) // register cb
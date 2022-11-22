const arrSize = 100
let timeStart
let numbers = []
for (let i = 1; i <= arrSize; i++) numbers.push(i)
numbers.sort(() => Math.random() - .5)
drawArray(numbers)

document.getElementById('btn-start').addEventListener('click', () => {
    (async () => {
        timeStart = Date.now()
        await quickSort(numbers)
        drawArray(numbers)
        const time = Date.now() - timeStart
        document.getElementById('time').textContent = (time / 1000).toFixed(2) + ' sec'
    })()
})

document.getElementById('btn-reset').addEventListener('click', () => {
    numbers = []
    for (let i = 1; i <= arrSize; i++) numbers.push(i)
    numbers.sort(() => Math.random() - .5)
    drawArray(numbers)
})

async function quickSort(arr) {
    await partition(arr, 0, arr.length - 1)
    drawArray(arr)
}

function drawArray(arr, curr = -1, other = -1) {
    const chart = document.getElementById('chart')
    chart.innerHTML = ''
    chart.style.width = '100%'
    chart.style.height = '500px'
    chart.style.display = 'flex'
    chart.style.alignItems = 'flex-end'
    const biggest = arr.reduce((prev, curr) => curr > prev ? prev = curr : prev = prev)
    arr.forEach((n, i) => {
        const nElement = document.createElement('div')
        const heightSize = (n / biggest) * 100
        nElement.style.height = heightSize + '%'
        if (curr === i) {
            nElement.style.backgroundColor = '#0F0'
        } else if (other === i) {
            nElement.style.backgroundColor = '#F00'
        } else {
            nElement.style.backgroundColor = `rgb(${0}, ${0}, ${(heightSize / 100) * 255})`
        }
        nElement.style.flexGrow = 1
        chart.appendChild(nElement)
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function partition(arr, startIndex, endIndex) {
    if (endIndex - startIndex < 1) return

    let pIndex = getRandomIntInclusive(startIndex, endIndex)

    swap(arr, pIndex, endIndex)

    let count = startIndex
    for (let i = startIndex; i <= endIndex; i++) {
        if (arr[i] < arr[endIndex]) {
            const temp = arr[count]
            arr[count] = arr[i]
            arr[i] = temp
            count++
        }
        await sleep(1)
        drawArray(arr, endIndex, i)
    }

    swap(arr, endIndex, count)

    await sleep(1)
    drawArray(arr, count)

    await partition(arr, startIndex, count - 1)
    await partition(arr, count + 1, endIndex)
}

function swap(arr, a, b) {
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}

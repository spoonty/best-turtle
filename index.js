let container, turtleCards;

const dragAndDrop = (y) => {
    const cards = [...container.querySelectorAll('.turtle:not(.dragging)')];

    return cards.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset, element: child }
        else return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


document.addEventListener("DOMContentLoaded", () => {
    container = document.querySelector('.container');
    turtleCards = document.querySelectorAll('.turtle');

    turtleCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging')
        })
    })

    turtleCards.forEach(card => {
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging')
        })
    })

    container.addEventListener('dragover', event => {
        const afterElement = dragAndDrop(event.clientY);
        const draggable = document.querySelector('.dragging');
        container.insertBefore(draggable, afterElement);
    })
})
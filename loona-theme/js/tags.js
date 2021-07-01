// https://interactjs.io/docs/draggable/
const elements = document.querySelectorAll('.posts__tags ul');
var x = 0; var y = 0;

elements.forEach(function (element, index) {
    interact(element).draggable({
        startAxis: 'x',
        lockAxis: 'x',
        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.snappers.grid({ x: 30, y: 30 })
                ],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            interact.modifiers.restrict({
                restriction: element.parentNode,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            })
        ],
        inertia: true
    })
        .on('dragmove', function (event) {
            x += event.dx
            y += event.dy

            event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        })
});
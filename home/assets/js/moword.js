var links = document.querySelectorAll('.symbol');

links.forEach(function(link) { return link.addEventListener('mouseenter', shootLines); });

function shootLines(e) {

    var itemDim = this.getBoundingClientRect(),
        itemSize = {
            x: itemDim.right - itemDim.left,
            y: itemDim.bottom - itemDim.top
        },

        shapes = ['line', 'zigzag'],
        colors = ['#7ce0ff',
            '#ffcc16',
            '#ffe41c',
            '#ff8c8c'
        ];

    var chosenC = Math.floor(Math.random() * colors.length),
        chosenS = Math.floor(Math.random() * shapes.length);

    // create shape
    var burst = new mojs.Burst({
        left: itemDim.left + itemSize.x / 2,
        top: itemDim.top + itemSize.y / 2,
        radiusX: itemSize.x,
        radiusY: itemSize.y,
        count: 8,

        children: {
            shape: shapes[chosenS],
            radius: 10,
            scale: { 0.8: 1 },
            fill: 'none',
            points: 7,
            stroke: colors[chosenC],
            strokeDasharray: '100%',
            strokeDashoffset: { '-100%': '100%' },
            duration: 350,
            delay: 100,
            easing: 'quad.out',
            isShowEnd: false
        }
    });

    burst.play();
}
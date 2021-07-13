function Board(props) {
    const drop = e => {
        e.preventDefualt();
        const card = e.dataTrasfer.getData('card_id');
        card.style.display = 'block';

        e.target.appendChild(card);

    }
    const dragOver = e => {
        e.preventDefualt()
    }
    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    )

}

export default Board
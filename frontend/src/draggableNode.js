// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, accent }) => {
    const onDragStart = (event) => {
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="draggable-node"
            style={{ '--node-accent': accent }}
            onDragStart={onDragStart}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            draggable
        >
            {Icon && (
                <span className="draggable-node__icon">
                    <Icon size={13} strokeWidth={2.2} />
                </span>
            )}
            <span>{label}</span>
        </div>
    );
};

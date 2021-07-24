import { useDrop } from 'react-dnd'
import itemTypes from '../../utils'

export default function Chain() {
    const [collectedProps, drop] = useDrop(() => ({
        accept: itemTypes.CARD
    }))
    return (
        <div ref={drop}>
            Drop here!!
        </div>
    )
}

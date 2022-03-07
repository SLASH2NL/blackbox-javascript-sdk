import { ElementType } from "./ElementType"

export interface RoomElement {
    id: number
    config: any
    element: ElementType
    parent_element_id: number|null
    children: RoomElement[]
    name: string
    width: number|null
    height: number|null
    depth: number|null
    position_x: number
    position_y: number
    position_z: number
    rotation_x: number
    rotation_y: number
    rotation_z: number
    scale_x: number
    scale_y: number
    scale_z: number
    file_id: number|null
    hidden: boolean
    ignore_light: boolean
    start_time: string|null,
    end_time: string|null,
    utc_offset: number|null,
}
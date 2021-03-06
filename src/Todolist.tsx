import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType, fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "./api/tasks-api";


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active')
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    }, [props.changeFilter, props.id])


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return <div>
        <h3><EditableSpan title={props.title} OnChangeCallback={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {
            tasksForTodoList.map(t => <Task changeStatus={props.changeStatus}
                                       changeTaskTitle={props.changeTaskTitle}
                                       removeTask={props.removeTask}
                                       task={t}
                                       todoListId={props.id}
                                       key={t.id}/>
            )
        }
        <div>
            <Button variant={props.filter === 'all' ? "contained" : 'text'}
                    onClick={onAllClickHandler}>All</Button>
            <Button
                variant={props.filter === 'active' ? "contained" : 'text'}
                color={"primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? "contained" : 'text'}
                color={"secondary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})



const Todos = (props) =>
{
    const {todos, deleteTodo} = props
    const handleDelete = (id) =>
    {
      deleteTodo(id)
    }
    return (
        <div className='todo-container'>
          {todos.map( todo => {
            //console.log('todo', todo)
            return (
              <li className='todo-child' key={todo.id}>{todo.title} &nbsp; &nbsp; <span onClick={() => handleDelete(todo.id)}>x</span></li>
            )
          })}
        </div>
    );
}

export default Todos;
import type { FC } from 'react'

import '@thumbtack/thumbprint-scss/checkbox.css'
import '@thumbtack/thumbprint-scss/label.css'

interface Todo {
  id: string
  title: string
  completed: boolean
}

export const AdvancedExample: FC = () => {
  // Please also use graphql-code-generator for your queries!
  const [query, reexecuteQuery] = useQuery<{ todos: Todo[] }>({
    query: `
      query Todos {
        todos {
          id
          title
          completed
        }
      }
    `,
  })

  const [completeMutation, executeCompleteMutation] = useMutation(`
    mutation CompleteTodo ($id: ID!) {
      completeTodo(id: $id) {
        id
        completed
      }
    }
  `)

  const error = useMemo(() => query.error || completeMutation.error, [query, completeMutation])

  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  // TODO: Definitely use a better API for this. The demo todo API we are using doesn't save our updates, so we are faking them here.
  const todos = useMemo(() => {
    if (!query.data?.todos) { return [] }

    return query.data.todos.map(todo => ({
      ...todo,
      completed: !!Reflect.get(completed, todo.id),
    }))
  }, [query])

  const handleCompleteTodo = useCallback((id: string) => {
    return async () => {
      setCompleted(existing => ({ ...existing, [id]: Reflect.has(existing, id) ? !Reflect.get(existing, id) : true }))
      await executeCompleteMutation({ id })
      reexecuteQuery()
    }
  }, [completed, executeCompleteMutation, reexecuteQuery])

  return (
    <div className="todo-list">
      <h2 className="tp-title-3">Advanced Example:</h2>
      <div>
        {!todos.length && query.fetching && (
          <p className="tp-title-5">Loading...</p>
        )}
      </div>
      {!!error && (
        <p className="tp-title-5">
          Error:
          {' '}
          {error.message}
        </p>
      )}
      <br />
      {!!todos.length && (
        <div className="todo-items">
          {todos.map((todo, i) => (
            <div className={`tp-checkbox-wrap todo ${todo.completed ? 'todo-completed' : ''}`} key={i}>
              <input
                className="tp-checkbox-input"
                name="example-basic"
                id={todo.id}
                type="checkbox"
                checked={todo.completed}
                onChange={handleCompleteTodo(todo.id)}
              />
              <div className="tp-checkbox-image"></div>
              <label className="tp-label" htmlFor={todo.id}>{todo.title}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

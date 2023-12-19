export function Page() {
  useEffect(() => {
    throw new Error('Something terrible happened!')
  }, [])

  return (
    <div>
      <p>Just wait for it...</p>
    </div>
  )
}

declare module "*.md" {
  const Component: React.ComponentType<{ children?: never }>;
  export default Component;
}

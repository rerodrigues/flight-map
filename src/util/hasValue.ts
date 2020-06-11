export default <T>(type: T, value: string): boolean => Object.values(type).includes(value);

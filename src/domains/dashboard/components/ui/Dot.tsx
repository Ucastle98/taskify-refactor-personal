type Props = {
  color?: string;
  size?: number;
};

export default function Dot({ color = '#5534DA', size = 8 }: Props) {
  return (
    <span
      className="rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
}

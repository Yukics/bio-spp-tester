import Test from "@/components/test";

export default async function TestPage({ params }: { params: { name: string } }) {
  const { name } = await params;
  const testName = name;

  interface Element {
    nombre: string;
    imagenes: string[];
  }

  return (
    <div>
      <Test testName={testName} />
    </div>
  );
}

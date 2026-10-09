import Link from "next/link";

export default function Home(){
    return(
        <main>
            <h1>Ejemplo de MiniProyecto con Next</h1>
            <p>
                <Link href="/practica/1">Ir a /practica/1 como una ruta dinamica</Link>
            </p>
        </main>
    );
}
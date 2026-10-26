import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1>Sistema de Talleres</h1>
            <p>Bienvenido a la plataforma de gestión, inscripción y consulta de talleres.</p>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                <Link href="/talleres">
                    Ver catálogo de talleres →
                </Link>
                <Link href="/perfil">
                    Consultar mi perfil y boleta →
                </Link>
            </div>
        </main>
    );
}
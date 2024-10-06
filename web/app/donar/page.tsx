'use client';
import React, { useState, FormEvent } from 'react';
import styles from './donar.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    name: 'Cancha de futbol para un barrio de escasos recursos',
    image:
      'https://bacupsoccer.wordpress.com/wp-content/uploads/2011/04/dsc006092.jpg',
  },
  {
    id: 2,
    name: 'pozo en africa',
    image:
      'https://www.wearewater.org/wp-content/uploads/2015/05/ghana-1_143763.jpg',
  },
];

type IProject = {
  id: number;
  name: string;
  image: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const callProject = async (project: IProject, index: number) => {
    setShowProjects(false);
  };
  return (
    <>
      <div>
        {showProjects ? (
          <div>
            <b>Lista de proyectos</b>
            {projects.map((el: IProject, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.donate_card}
                  onClick={() => callProject(el, index)}
                >
                  <div>
                    <b>Proyecto:</b> {el.name}
                  </div>
                  <Image
                    src={el.image}
                    width={200}
                    height={200}
                    alt={el.name}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button
              className={styles.login_form_button}
              onClick={() => setShowProjects(true)}
            >
              Atrás
            </button>
            <form onSubmit={onSubmit} className={styles.login_form}>
              <div className={styles.login_form_content}>
                <label>Digita tu valor a donar en doláres:</label>
                <input type="number" name="amount" />
              </div>
              <div className={styles.login_form_content}>
                <label>
                  Digita que impacto te gustaría ver con tu donación:
                </label>
                <input type="text" name="impact" />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.login_form_button}
              >
                {isLoading ? 'Donando...' : 'Donar'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

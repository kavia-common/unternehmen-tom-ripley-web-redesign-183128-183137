import React from 'react';
import Section from './Section';
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';

/**
 * PUBLIC_INTERFACE
 * Team section presenting 3–6 team members as an accessible, responsive image grid.
 *
 * - Uses shared Section wrapper with id="team"
 * - Renders members as <figure> with <img loading="lazy" width/height and alt text>, and <figcaption> (name, role)
 * - Keyboard focus styles on cards
 * - Responsive layout: 1 col (mobile), 2 cols (md), 3 cols (lg)
 * - Ocean Professional theme variables for colors/shadows
 * - Imports placeholder images and loops if fewer than needed
 */
function Team() {
  // Placeholder team data; reuse provided images, cycling if needed
  const baseMembers = [
    { name: 'Alex Rivera', role: 'Founder & Principal', img: team1, alt: 'Portrait of Alex Rivera smiling' },
    { name: 'Jordan Kim', role: 'Design Lead', img: team2, alt: 'Portrait of Jordan Kim with a friendly expression' },
    { name: 'Morgan Lee', role: 'Engineering Lead', img: team3, alt: 'Portrait of Morgan Lee in professional attire' },
  ];

  // Ensure we have between 3 and 6 by cycling images and roles
  const desiredCount = 6;
  const roles = ['Founder & Principal', 'Design Lead', 'Engineering Lead', 'Project Manager', 'Frontend Engineer', 'Operations'];
  const members = Array.from({ length: desiredCount }, (_, i) => {
    const base = baseMembers[i % baseMembers.length];
    return {
      name: `${base.name.split(' ')[0]} ${base.name.split(' ')[1] || ''}`.trim(),
      role: roles[i % roles.length],
      img: base.img,
      alt: base.alt,
    };
  });

  return (
    <Section
      id="team"
      title="Meet the Team"
      subtitle="Experienced professionals dedicated to clarity, performance, and partnership."
      size="md"
      className=""
    >
      <div className="grid grid-3" role="list">
        {members.map((m, idx) => (
          <figure
            key={`${m.name}-${idx}`}
            className="card team-card"
            role="listitem"
            tabIndex={0}
            aria-labelledby={`member-${idx}-name`}
            aria-describedby={`member-${idx}-role`}
          >
            <div className="avatar-wrap">
              <img
                src={m.img}
                alt={m.alt}
                loading="lazy"
                width="480"
                height="480"
                className="avatar"
              />
            </div>
            <figcaption className="member-meta">
              <span id={`member-${idx}-name`} className="member-name h3">{m.name}</span>
              <span id={`member-${idx}-role`} className="member-role muted">{m.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Local styles scoped to team section */}
      <style>{`
        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: var(--space-6);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          outline: none; /* rely on :focus-visible custom state */
        }
        .team-card:focus-visible {
          box-shadow: var(--shadow-lg), 0 0 0 4px color-mix(in srgb, var(--color-primary) 22%, transparent);
          border-color: color-mix(in srgb, var(--color-primary) 35%, var(--border));
        }

        .avatar-wrap {
          width: 100%;
          max-width: 240px;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          background: color-mix(in srgb, var(--color-primary) 6%, var(--surface));
        }
        .avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .member-meta {
          display: grid;
          gap: 2px;
        }
        .member-name {
          margin: 8px 0 0 0;
          line-height: 1.3;
        }
        .member-role {
          font-size: 0.95rem;
        }

        @media (max-width: 479px) {
          .team-card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </Section>
  );
}

export default Team;

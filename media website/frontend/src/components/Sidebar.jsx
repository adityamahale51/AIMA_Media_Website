import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import { surveyStates, districts } from '../data/staticData';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('members');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.getActiveMembers()
      .then(res => setMembers(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-card-header sidebar-tabs-header">
          <a href="#" className={activeTab === 'members' ? 'active' : ''} onClick={e => { e.preventDefault(); setActiveTab('members'); }}>
            <i className="fas fa-fire"></i> Most Active Members
          </a>
          <a href="#" className={activeTab === 'committees' ? 'active' : ''} onClick={e => { e.preventDefault(); setActiveTab('committees'); }}>
            <i className="fas fa-sitemap"></i> District Committees
          </a>
        </div>
        {activeTab === 'members' && (
          <>
            <div className="sidebar-card-body">
              {members.map((m, i) => (
                <a href="#" className="member-item" key={i} onClick={e => e.preventDefault()}>
                  <div className="avatar">
                    <img src={m.avatar} alt={m.name} onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(m.name) + '&background=e0e0e0&color=888'; }} />
                  </div>
                  <div className="info">
                    <div className="name">{m.name}</div>
                    <div className="location">{m.shortName} {m.location}</div>
                  </div>
                </a>
              ))}
            </div>
            <Link to="/members" className="view-more-btn"><i className="fas fa-arrow-right"></i> View More</Link>
          </>
        )}
        {activeTab === 'committees' && (
          <div className="sidebar-card-body" style={{ padding: '16px' }}>
            <select style={{ width: '100%', padding: '10px', border: '2px solid var(--border-color)', borderRadius: 'var(--radius)', fontSize: '13px', marginBottom: '10px' }}>
              <option>Select District</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>
            <p style={{ fontSize: '12px', color: 'var(--text-light)', textAlign: 'center' }}>Select a district to view committee members</p>
          </div>
        )}
      </div>

      <div className="survey-card">
        <h3>AIMA सर्वे — विधान सभा चुनाव 2022</h3>
        <div className="survey-states">
          {surveyStates.map(s => <a href="#" key={s} onClick={e => e.preventDefault()}>{s}</a>)}
        </div>
        <p>किसकी बनेगी सरकार? अपना मत देकर सर्वे में बनें भागीदार!</p>
        <a href="#" className="start-btn" onClick={e => e.preventDefault()}><i className="fas fa-play"></i> शुरू करें</a>
      </div>

      <div className="action-card">
        <a href="#" className="action-btn btn-primary-action" onClick={e => e.preventDefault()}><i className="fas fa-list"></i> All Candidate List</a>
        <Link to="/login" className="action-btn btn-secondary-action"><i className="fas fa-bullhorn"></i> Start Your Campaigning</Link>
        <Link to="/login" className="action-btn btn-accent-action"><i className="fas fa-id-card"></i> Download Your Membership ID Card &amp; Certificate Click Here</Link>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Code2,
  Activity,
  CheckCircle2,
  Database,
  ArrowRight,
  Search,
  ExternalLink,
  RefreshCw,
  LogOut,
  LayoutDashboard,
  Server,
  Zap,
} from 'lucide-react';
import { ROUTES } from '../routes/paths.js';
import { useAuth } from '../context/AuthContext.jsx';
import { getAdminOverview, getLanguages } from '../services/api.js';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { StatusIndicator } from '../components/common/StatusIndicator.jsx';
import { Alert } from '../components/common/Alert.jsx';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [overviewRes, langRes] = await Promise.all([
        getAdminOverview(),
        getLanguages(),
      ]);

      if (overviewRes && overviewRes.success) {
        setOverview(overviewRes.data);
      }
      if (langRes && langRes.success && Array.isArray(langRes.data)) {
        setLanguages(langRes.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load administrative overview metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredStudents = (overview?.students || []).filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Admin Top Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-surface-lg text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono">
                <Shield className="w-3.5 h-3.5 mr-1" />
                ADMINISTRATOR CONSOLE
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                CodeForge Management v1.0
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Administrator'}
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Platform administration portal according to student activity, language catalogs, and database infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to={ROUTES.DASHBOARD}>
              <Button variant="outline" size="sm" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20">
                <LayoutDashboard className="w-4 h-4" />
                <span>Student Dashboard View</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              isLoading={isLoading}
              className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              title="Refresh platform statistics"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2 text-rose-300 hover:text-white hover:bg-rose-900/50 border-rose-500/30"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Error alert if any */}
      {error && (
        <Alert variant="error" title="Data Synchronization Error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="p-5 flex items-center gap-4 border-slate-200 dark:border-border-subtle shadow-surface-sm">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 dark:text-content-muted uppercase">Total Students</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-content-primary">
              {overview?.metrics?.totalStudents ?? 0}
            </h3>
            <p className="text-[11px] text-emerald-500 font-medium">Registered Accounts</p>
          </div>
        </Card>

        {/* Active Languages */}
        <Card className="p-5 flex items-center gap-4 border-slate-200 dark:border-border-subtle shadow-surface-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 dark:text-content-muted uppercase">Official Languages</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-content-primary">
              {languages.length || overview?.metrics?.activeLanguages || 5}
            </h3>
            <p className="text-[11px] text-blue-500 font-medium">C, C++, Java, Python, JS</p>
          </div>
        </Card>

        {/* Database Status */}
        <Card className="p-5 flex items-center gap-4 border-slate-200 dark:border-border-subtle shadow-surface-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 dark:text-content-muted uppercase">Data Layer</p>
            <h3 className="text-base font-bold text-slate-900 dark:text-content-primary truncate max-w-[140px]">
              {overview?.metrics?.databaseMode || 'Active'}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Zero Errors</span>
            </div>
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-5 flex items-center gap-4 border-slate-200 dark:border-border-subtle shadow-surface-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 dark:text-content-muted uppercase">Security Layer</p>
            <h3 className="text-base font-bold text-slate-900 dark:text-content-primary">
              RBAC Guarded
            </h3>
            <p className="text-[11px] text-amber-500 font-medium">JWT Expiry: 7 Days</p>
          </div>
        </Card>
      </div>

      {/* Main Content: Student Directory & Language Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Registered Students Directory */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border-slate-200 dark:border-border-subtle shadow-surface-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-border-subtle">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-500" />
                  <span>Student Accounts Directory</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-content-muted">
                  Authentic registered students from the active database.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-surface-elevated border border-slate-200 dark:border-border-subtle focus:outline-none focus:ring-1 focus:ring-violet-500 text-slate-900 dark:text-content-primary"
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-border-subtle text-slate-400 dark:text-content-subtle font-mono uppercase text-[10px]">
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Selected Language</th>
                    <th className="py-2.5 px-3">Streak</th>
                    <th className="py-2.5 px-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-border-subtle">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((st) => (
                      <tr key={st.id || st.email} className="hover:bg-slate-50 dark:hover:bg-surface-elevated/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-content-primary">
                          {st.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-600 dark:text-content-secondary">
                          {st.email}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
                            {st.selectedLanguage}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-700 dark:text-content-secondary">
                          🔥 {st.streak}d
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant="neutral" size="sm" className="uppercase font-mono text-[10px]">
                            {st.role}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-content-muted">
                        No students found matching "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Supported Languages & Quick Info */}
        <div className="space-y-6">
          {/* Programming Languages Catalog */}
          <Card className="p-6 border-slate-200 dark:border-border-subtle shadow-surface-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border-subtle">
              <h3 className="text-base font-bold text-slate-900 dark:text-content-primary flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>Language Catalog</span>
              </h3>
              <Badge variant="success" size="sm">5 Active</Badge>
            </div>

            <div className="space-y-2.5">
              {languages.map((lang) => (
                <div
                  key={lang.slug}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-elevated/60 border border-slate-200 dark:border-border-subtle flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      {lang.fileExtension.replace('.', '').toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-content-primary">
                        {lang.name}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400">
                        {lang.version}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Infrastructure & Tips Card */}
          <Card className="p-6 border-slate-200 dark:border-border-subtle shadow-surface-sm space-y-3 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-surface-elevated/40 dark:to-surface-elevated/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-content-primary flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Platform Control</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-content-muted leading-relaxed">
              Admin privileges allow inspecting student progress, reviewing official compiler runtimes, and verifying backend connectivity.
            </p>
            <div className="pt-2">
              <Link to={ROUTES.DASHBOARD} className="w-full">
                <Button variant="primary" size="sm" className="w-full gap-2">
                  <span>Enter Student Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

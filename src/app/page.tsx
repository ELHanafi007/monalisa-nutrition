import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function TestDBPage() {
  let dbStatus = "Testing...";
  let errorDetails = null;

  try {
    // Try to execute a simple query
    await pool.query('SELECT 1');
    dbStatus = "✅ Connected successfully!";
  } catch (err: any) {
    dbStatus = "❌ Connection failed!";
    errorDetails = err.message || JSON.stringify(err);
  }

  const credentials = {
    MYSQL_HOST: process.env.MYSQL_HOST || "Not set",
    MYSQL_USER: process.env.MYSQL_USER || "Not set",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "Not set",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "Not set",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8 font-mono">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b pb-2">
            Database Connection Status
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Status:</h2>
            <div className={`p-4 rounded text-lg font-bold ${errorDetails ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {dbStatus}
            </div>
          </div>

          {errorDetails && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-red-700">Detailed Error Message:</h2>
              <pre className="bg-gray-900 text-red-400 p-4 rounded overflow-x-auto whitespace-pre-wrap">
                {errorDetails}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b pb-2">
            Environment Credentials
          </h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
            <pre>
{`MYSQL_HOST:     ${credentials.MYSQL_HOST}
MYSQL_USER:     ${credentials.MYSQL_USER}
MYSQL_PASSWORD: ${credentials.MYSQL_PASSWORD}
MYSQL_DATABASE: ${credentials.MYSQL_DATABASE}`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}

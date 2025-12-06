import edge from 'edge.js'
import env from '#start/env'
/**
 * Define the global data or state that should be available
 * to all views
 */
edge.global('appVersion', '1.0.0')
edge.global('appUrl', env.get('APP_URL'))

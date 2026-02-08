<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetDynamicUrls
{
    public function handle(Request $request, Closure $next): Response
    {
        $rootUrl = $request->getSchemeAndHttpHost();

        config([
            'app.url' => $rootUrl,
            'app.asset_url' => $rootUrl,
            'filesystems.disks.public.url' => $rootUrl.'/storage',
        ]);

        return $next($request);
    }
}

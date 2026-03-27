function parseProvider(rawValue) {
  if (!rawValue) return null;

  try {
    const url = new URL(rawValue);

    if (url.hostname.includes('youtu.be')) {
      return {
        provider: 'youtube',
        id: url.pathname.replace('/', ''),
      };
    }

    if (url.hostname.includes('youtube.com')) {
      return {
        provider: 'youtube',
        id: url.searchParams.get('v') || url.pathname.split('/').pop(),
      };
    }
  } catch (e) {
    return {
      provider: 'youtube',
      id: rawValue.trim(),
    };
  }

  return null;
}

function buildEmbed(parsedVideo) {
  if (parsedVideo.provider === 'youtube') {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${parsedVideo.id}`;
    iframe.title = 'Embedded video player';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    return iframe;
  }

  return null;
}

export default function decorate(block) {
  const link = block.querySelector('a');
  const rawValue = link?.href || block.textContent.trim();
  const parsedVideo = parseProvider(rawValue);

  if (!parsedVideo?.id) return;

  const embed = buildEmbed(parsedVideo);
  if (!embed) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'video-embed';
  wrapper.dataset.provider = parsedVideo.provider;
  wrapper.append(embed);

  block.replaceChildren(wrapper);
}

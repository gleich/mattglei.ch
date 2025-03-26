<script lang="ts">
	import Image from '../../../image.svelte';

	interface Photo {
		src: string;
		alt: string;
		width: number;
		height: number;
		placeholder: string;
	}

	// prettier-ignore
	const photoData: Photo[] = [{src:'/photos/ritracing.webp',alt:'ritracing',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAAmUlEQVR4nBTJvY7CMAwAYMdx0rjpXX/U5d7gRhbEzvuvSKydWIuE6I/jGjF/BOdL78qfX9toISSB9NzgPr+O6UHXhpwBGiGaw6g+Ibh/1qmr6TTWWmRdYVGn8dfSTwHsKY6H0JBzEVnQJyXlDupWneeYoinNmgAIAkWusPnaDl6Q/LbT7R3Y+SFQxxxyNs67oZZDqvwJAAD//zFxODfVHw5tAAAAAElFTkSuQmCC', width:1919,height:1280},{src:'/photos/a4.webp',alt:'a4',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAfUlEQVR4nBTIXXKEMAwDYEm2s5ufAve/aIcQ4k5fPweAiuvszr2e5+Xnn+ITpTQjxHtteYzvOa7xcxjx3Pdcy89x9X70fpg4/dfm9Fpb/bZam5EGguZRSkSEFxfz3e+Gm7lJRokymVtIIkFmcqdSkjkIILETTACi/gIAAP//n/kh8WtR150AAAAASUVORK5CYII=', width:1237,height:1855},{src:'/photos/quinn.webp',alt:'quinn',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAIAAABP3xIpAAABNElEQVR4nFzQzW4TUQzF8ePr46+5N0yqQCgL2g1C6vs/HYKMUYRApJYXXvzkxZ94nK+2Pb9+yf0kW/w0/hjyXjh6AANAQwAFHoQAayDQxNFooEUef7wBZ0PKMaQhfQiO/8U34BlYKcbG6FZABfwrrsALcBmoaeLSJjARH0q9iwC+A5+A/bP6dCkeqZLUMCX5Bt+B68LTWU8f0k4p03ualFs4zfj6cqmBix17Yk6zmbJCZmqlRZoZrx9XSO96W96zaFuNVTqLW3mk0/h0Lkev8Wuyt6TP4ErOsq0i0s24n4LoTbT0yGBsabN8Vf4Ta7r2kZDQW4RleVRkZW6Zf8SWNvrmgA+xoIdFepVXRmY4SXcdDeuDAzSl043ulmF5v43kuCfuMaSHDtV7R1OlqvG+vwMAAP//YgEzQ0/t75AAAAAASUVORK5CYII=', width:2248,height:3372},{src:'/photos/clarkson.webp',alt:'clarkson',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAGCAIAAABrW6giAAAAXklEQVR4nABOALH/BG55TygY0ywpOfT9GAQAAgL5/BPz9QL5AwMEAAUF7vUZ4OYCBA4GBPz/AOzyCfP0/REZ/gT29vr+9f/4/vwABPIC9fL2//rpCgP0/PHpAQAA//89gykWS5UG1AAAAABJRU5ErkJggg==', width:898,height:1347},{src:'/photos/eye.webp',alt:'eye',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAqUlEQVR4nATAS06AMBAA0KGdttMWiICESNTEFUfwaK69lTcw7gw3MK5IN/ilU7D48OnxIYY1zPPy/cwK6AUwaR+Jf0r61XBoKK4BPy+u1qzexi7ARGScE/hxOS5SvfIQ5Ndkq+Qd5qZncb7vA+NmTGmUx7auEvB96kHwHWq7E946XWdnuf3L3J6nwQJvVNEZbKhKabMp6szYy8wovCI+vMyH3uN/AAAA//+yukHv2ppewQAAAABJRU5ErkJggg==', width:1263,height:1894},{src:'/photos/spider.webp',alt:'spider',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAlklEQVR4nBzNQVIDQQxDUcl295AKcP+jJh1bogYttfivrp9vRtX+WuuqqiQCsloaWWPUVYkIk8a9jKiIAOXsmTOu5+Ma84htF7hWPXau/8770zhde2UPPnbLsjO4V+0KWwaPXLAA2JZ425Il+36AW673eY04Q8Iafg5fnOkwfHqmm8/fMFLcjF1593ciaRADDvAXAAD//9usamIYfARjAAAAAElFTkSuQmCC', width:2352,height:1568},{src:'/photos/up.webp',alt:'up',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAIAAAA88gD/AAAAw0lEQVR4nETP3UrDMBxA8ZPu39VUarUwvbG6vYGv5fsKohfzCxQLLtNBsixNIr3aeYHDT+7BwRc8wgh3sAJJoGAOC+oEJTaDjEBDs1ou26usVP07pOe1BI30s7bvy+4yK+KmGv2LHDqkvTntLppFB+yIpr2VUJErPdda1xrw+iRVdRETCTLHphuOuHfeOWtdBu/2eCuzb+L5+9/PtadEETam2L6JQHyKpvwIuwNK6e3QrLMUEMA8vH4y5Almz+A/AAD//5zWUkz24rXaAAAAAElFTkSuQmCC', width:1520,height:2278},{src:'/photos/cadillac.webp',alt:'cadillac',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAeUlEQVR4nATArQ7CMBAH8Pv497qxsWQJL8Ob40AjwIMjwWEQNLTlWn44nq9CFFRigAFQFqrcMt6vJxGrSEQYDFFJeu2ecbscGimxRQyLYVLSlr0mPO4n1jnYbhO2ReTTs/5S8wRd92Mc1mmZbYQ7lS97gfZ/AAAA///iNik1siPRewAAAABJRU5ErkJggg==', width:1609,height:1074},{src:'/photos/ladybug.webp',alt:'ladybug',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAABH0lEQVR4nESQW27dMAxEZ0jKTvfR/XQh3Xc/ghaIk3stS+KjcB8IMX/nYw7Hvn3/WsjMsbyP/jif83zD8w39wHxA8O9IkCJKikIVIoDA8j8VEdPWWu2b+55zLw5YfWJrtmFjvWgMny/ee1okSApFRdWa7sLQmHp1clsWWWSJ3L2iKLA2bjvaVmJlK0oJBSC8OViGZqWWELW1sggDSghCcDvebRRAbV6RCi1pwN8vMlCJijs2u6fSolZRksryVfEnOcuup5tCXDQFTkH5zNlj9cwzrR+zGeUL6RLt3spn9g+fH+E/w85fo22oKblkGVmMq6737K/LR2gdkbe8Z/laMc7sR5w/or/HhbBetY7KgifUIgf9VeashUzgdwAAAP//g77PmulZjdkAAAAASUVORK5CYII=', width:2069,height:3100},{src:'/photos/rocky8.webp',alt:'rocky8',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAAhElEQVR4nFTJMQ6EQAgF0M+A49zC3vuXXsHCk5hIjFEENk63r32yrquItI6ZI8I6dwcg+76LyDiOrbVSSkQ8z2NmEfH1tm3MXGsdhgHA+773fZtZZn69LEsphZkBmNl5nqp6XReAWitN05SZ7q6qx3Hgn8zzTETZeRcRRMTMIvILAAD//zWlVTyDA/nYAAAAAElFTkSuQmCC', width:2047,height:1365},{src:'/photos/mtb2.webp',alt:'mtb2',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAApklEQVR4nFSNMaqFMBBFg3MxaJxISFATsFGwyBLc/07cgGBhoZjPN+8V7zbDORwYEu/GcZznuaqqfd+FEEW2AIgopZTxY5m5ruui+Eb5OOeY+TiOn3YYhr7vQwgZ/7+t6xpjtNYCKMty2zYsyzJNk/eemaWU13U55xBjDCF0Xae1llI+z2OMgffeWmuMadsWwH3fSilorZumUe9SSud5EtFfAAAA///8GiLyr4tWmgAAAABJRU5ErkJggg==', width:1440,height:2160},{src:'/photos/motorcycle.webp',alt:'motorcycle',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAIAAAAYbLhkAAAArUlEQVR4nATAwU6EMBAG4On070BhYAtCsmazctLEm0/g+3vzDUw86dlEKQsdP9AzvT68PF2X4tzH99f75xuSzILgmcgKyIYw8mO/pKhRSPgW2S7tGcvd/dRDK/qzrYeLacZ1mrUrGn95t1RLCCMu0yD17mGWxRpp9YTz2Dtst7LtqwZ1p6SYUnMQftacJTt2QxeRumrdOR+NhE2EtK0QKxAbvHjU4qkW/AcAAP//zBguqmlmqVcAAAAASUVORK5CYII=', width:1355,height:2032},{src:'/photos/mtb1.webp',alt:'mtb1',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAC+k6JsAAAAfElEQVR4nATAzRLBMBQF4HvkzE0aZaGMhYf2OJbepHZYYAzVpn+5Pp5PR4ioMsQC4tml0S0ACNJgAt7un2Xhyqgm/ZTJun7str5a++6Xu0l4vbw4R53C9zm800htW2ske2Ma0fQ8bFyA6ZxjSUjmvgpmCA6r0jvyHwAA//9pgzITGJGPuAAAAABJRU5ErkJggg==', width:1136,height:1704},{src:'/photos/nyc.webp',alt:'nyc',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAj0lEQVR4nByNW26DMBAA92WwREtB4gRVvnL/c0GUYMCLdx3BfM7HjPw/nkSIiKWUI59mJogQYxvbNmc1+wiTMPPw14/jkNKmqsR8qb7/naapad7zvIQQhJlijD9dV0ppLgIR3nFEIhRhonumqvu+a1YAMHMBgJS2ZXkdOXutXlQA6romd6+1unvW8xsAAP//Dm5HffxinpsAAAAASUVORK5CYII=', width:1259,height:1888},{src:'/photos/hayhay.webp',alt:'hayhay',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAwklEQVR4nBTMXUrDQBAA4PnLZHcTQ00eBPEYgt7/JMEXEU1pCyVmf2bEC3zy/vpWc75vl/x9HZ5Oy8vztMwaQinlsp2/1g8J42C1F2GbpxDjMD2EFLlTIOpTHJdZTsuju4M1AlTVEJOGAEQlF0AkEYljQgBC7IhVVVSJxQGQyNwQUVqrBEhMCAzgYObYmrm14lYBmly3MyEKoYpo928gs4HXnI/fPe+7fK4rgYu7Cvcx9DFxr4BYy3Hcb8ft5y8AAP///JFRnzuuyT8AAAAASUVORK5CYII=', width:2224,height:1483},{src:'/photos/pete.webp',alt:'pete',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAAlUlEQVR4nATAS1LGIAwAYEhCG56jG8/pEVx4QC/grs64c7QtFhrI/9H72ysQcuBcUk4xrCsCiEi7O/3XCoRTFQDBgMpEgDGkS6fvr80i0Ro45hxj8Lw4q0ZEG22fH9PywCfnn1MqJbL3Fp1M2/Al7Wf9+d3/jgpyDxUZcvV+Xu2gpRicBtSB0xCV2SwOLOBQegQAAP//OQVEy25fAGwAAAAASUVORK5CYII=', width:1951,height:1301},{src:'/photos/eggBeach.webp',alt:'eggBeach',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAcElEQVR4nATASw6CQAwGYDp//8Iw8ZG44kAuXHr/C5Bo8JEoSEfrp8fzieBhu+9Lvj8fCnYEqWYJbEQt71qw70rRZpWUBC3YmZpJ4i90+awIcdOveF1mbIYhqmcJ8fk2XTDKK3ktkPD3dRr/AQAA//8VlyRYkbOcxwAAAABJRU5ErkJggg==', width:1020,height:1529},{src:'/photos/fox.webp',alt:'fox',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAb0lEQVR4nBzLvQ4BURTE8Zl75ghrIz56xaLUb2g8gE68/yMIiUhc62zu/U01xV/X+w2gzCSR1OP5spTc3csHsWmxWG+Xq4mUh4Go0qET+f28dTyf5rNp2zQRyL+sS99bhYh/hPbdjiVioGwMAAD//3jGGcUDy51bAAAAAElFTkSuQmCC', width:1065,height:1597},{src:'/photos/flower.webp',alt:'flower',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAAET0lEQVR4nHxWCXPbNhN9uwBIyUpsJ9/R///nOtO0cVxHFIlrt7MAaMmJGwxMczQQHt6xC3n8PB7D58fP/zud7g+H0zwfpmkOYfI+OOeYHTERQQFVUZUqpdZcaso55rymdInxZV2/XM7Pfz/h8mbj98DYObItbdebl5sBYPy9fkL7YnsyeSY4gh3qF2AMTPOh8fBtOsdG6GZSX6lEYns5qCg7adOxdxy8m33APGPZINe93Y9gD9P96eOn4/E0z8fZBBwa2hzYvkEyMxG4sRvoUAWkyVuhWTVhRfw3sCPh4fG3u7vu1nGeDlOYpzAHPwUDC943vOYek7HkoWHTtFkJCFQNV1/s8/iKdwM2AZ8e/3s6Ga3DfDdPR0MyvOkt2Ku2g94wDQoCaXNJu3hMWBjghGKn2D07eNx/mI+nh/nQCTWMwanL6JuAg4uFUUW0inS8nVbTUOWgWlTuVZLiGQy/IFaPD3dwDocJx/k/jdBh92nakYxWJzScou6QiDqhwqbjK1hVmdUOUWQqog+KDCzsEZLH6QTHCP5xmk69pK6JsGHquS4g/wxWZZRCk86QgvgqEiRMIrPInegnU5YXF7wFlMkH/yGE2fvJXUO/2zMS0R7Ee/TVLJGOJC39Xrk65714caFKcH7yMlfJovcKT9XDezDdOz85F9j14++1RY5ovOzPN8zACmFlp1ods1iDcdUW7Zs4z25iKaxw5Mm5mShwM7/5by0DN22htwkLds/Bq2xEpPs68LWD4Lb1MFmH88SVlH3rItz3Gs2l/e8R1j61m2/v4zlKGCPq2JfcVK32atj7mpI3W7mZK62x9j9RsaH9nwjbo8tnxWN7tEPsS+yr2ndo39X+QS8PqTZrVV9KBdMRKJVqcdXV4l2tUquUUoupL5XqcMmBRbuYvaREpC++ndJfypil1JwlFfFIpRAtojPoQCU7zrlkZk8tHebfrqcduVWwZaQVdQcTye2WKWP095pLybmmVGKql1i+5+pAM2otogwEIt927wFhEK4ttus0hLWDi5R2mZW+da6plJRLyjmlHFNeY1ljvmz5Zc1fl1y/Z4cEbAVRoomkrnlCGOkezgz1GwvR2sYVppR2eZaUSuORY8xrzOuWljU9n+PXbxHrBokO1k0SNGKTNdqF15Kp1CLYQDBiUq0JNZhbQiXnRsjYGNJmSOmypuUSv71sf31dIQuwAOn2ismo8XIBKrine8SytaWOY1ADKXekUhshQ0oNadsa0rI9P29fnhfgpfF55/JUIK6p5LPxG8EdSObQiOhuUimmWx603iI9rX8sZ+B8+8uAfrypx2DGx/+H48eH6XicDrOfJh+CNTPvXu+w/TeP7L95Gt7lkl6ett/zGbeX9HvMrhQV8SxKF0I186SXudXmaw3tEW+5SDHHLa+XtDxtf5al/oT0C7Dh4gp2mbm0FjY6le79pRXvULXkVFPM2/d0TusZ27vb/RMAAP//StHx2qGzjTsAAAAASUVORK5CYII=', width:7360,height:4912},{src:'/photos/fog.webp',alt:'fog',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAADeUlEQVR4nGyWD87jtg7ESdkHe1d7N+hJCxRd7JdY5EzBEeU4aLOCPoXx6qfhP/n83///MH24PmaoPwBZC7AXZdrPwNAmPZgEgExkZmRqjowZcUVO2U3/eYhjojRTw3ro44/5ttxDX+kP++cZ19dtPYnelVvcDXkyXLaxz0CvI8GWkdBjQ/a1+Ayvx6iNTiJb0pLVM52tctDAB+YxXBg+FO+jcJHO/tXTHFKGHbIvpN9g2vHw69PH4hncnj9q2GEfz7q3vhMZXwfbriOXq6l/Hdd9IGJvWtEivcPGp7wdA3e3w6UMEc+w2yei/kyKj27NgysS9MewjuNXdrlxlA9rgxMxl9GXW1wZVPM6lDePvl1NebIEsWW189hqb2dyZwaHznJizt72M7n5aJK+PJK+eZAUrNRVcVZ9rrlzehnZx1zKMi7frh2ladCHD7gPWUYT73hKg6ugdfoFwOjqh+/1DjK9TyBltyZqc/PDMGxQdC6qbX3cThu1XQ2id3fUGEwyvahZz9TvBXbayXmxozTMxzEGHRyH4nr4KJ758A6rSkKCqhug+pAzDelIL8ZeFzgdFFWlSp5YblRoOI7yQZFIHhw1N6/T8y6n0uR18HyMsFwL1CKhBRwrfexkzE7yMaqrjoO8Y3xY8YZXIDsx2YmnZqx9WfsGM2shnhZlr46R3chLmeXk8hEP809gt7PKr6jI+achrbug5tSOSSxYIGSJYApWMzbMTsPslkLJsjudKyhFkrLOSe5OorwAct0syEDevChLU7Geosr9NIR2KTcaaPZVO1WOo3pNx3W7EV+wIiEiF6lG6msh8RB3uqVVGxzW7aFij91pKiGrSypXn3esAiZcLF7G1Bw5Z5FEzdgS5fazMkoRu9vfartAweir2ob1ATZNHN7KQrCYqYE5c8ZatFAly+lbhm8xgjktHMcq6rqb2offsIcPFwlx5Zx5XZjvnFdeV15vzDfmxZinev9dQQ0mc/f4Dp8unP+GVVLkRM6MC/PKwrzzeuX7J19/x+t3/tYriNnpa8f6g17plufdCVXRXLdp5yL0noOVgU9xpa94r3j/ytef8Qvxstwt+XSnPW46XZpqL1V96/1kkToV71ctldetL7EyT/py/uT1V/wUKT7RrreEfTX/696XB6G3EOsG/lTWL3I9o/OzqMirJG5N9+efAAAA//+h0BkQIoBIKgAAAABJRU5ErkJggg==', width:7360,height:4912},{src:'/photos/boat.webp',alt:'boat',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAAE4klEQVR4nGRW7Y7juBGs/iAl7wYBDnmNPEPe/03yO5u9tWWyu4NqeS4HnMDRaMYyq6tYXaT/9q9/CqBVhrIqr/Qq+9xLARNRERETVVHD1yjVEi2REkkgi1dWZkZFZO6KXbHugdxV2xUgGCAFqZICeC8UnwRAoa/7n3z5r5fyJon6eoAWsvq7PVVVSpWP/r4UyfVIzRR+lqjsqQSiov2apKTy7bpLIC0WKUjOLFnNsvEE1XTJFbmRy4/6VC1VmqWZmqG1hXeWIx8NXawUIlDq2V8SZZGgkuRADEFXmkFgBIFSYmU8K64bjLX2u3xNYku8NZfkloqe3dWm1qFQFdPkL7mpipZqQyMzb7CABiQKmrVjy3phXxXwo9flVpYy78Resi+J34naIqtC/G+aYjATpz+KyjZjgzQ54mUgSEhyQzedU9gR64mLQvrk6nLlK5NrFFl74/3E2rIgQeHEofOnYpgeZrAC7SimSnm7lgbj4ijnF1eElFLfSLxRT+AJn2J0CwGtKmiOXbUWnsAL8m6xTsg3qG718iI/F2uwoebyBdarFVQvSiikoTRDckF/R73gLk7Ll3a7pMCzrLbWFfj5cbbsJneolSmR3M3NhlmDmZE+es2i1bNeLh0pwzBoxhft6m6zmUXSXY0oR+I78kf90UfZXSin6DSbDTPdp/lUd/0DrDKUhmKHR6Xt0MP03HIKXgK4+aQ3Im/WFSJeMqqOwuu/iAY7gPkP8e/qp/ihflgj2ZjmrahosZGT6vWyRZbu0LFlPGT+hvPfeMFlHuxRC2wvGI1OFyuTSx+4Fpf5PPDtG87vOL7JfMg8ZZ46DxtDx5+YZZUG26OE7bFLZlKmR+LvqPrhMk90m8MC6qDeVuJls+ajdoqgxqhz1uOB84HjxHHKccqc0mBCTzLLtKoi2BIfwxSCeiLA0sfDa564q4oo3aleNtJHjpU7hPJC3WrOOo56HDhPHAfHnBgDfrcaqVUlIrrtOnE7xKqEuaQj5ul1nHeLZERapI/wFT5jboIVuzrMYnjOmceRR6Mes8as4eVW+pGRnUrXG3eD6pwsJDREt484tsdx3q8RbkfEjjFi8TGDYAxH03DPMRpv8j4H/xzte2ZXy9ZJmGrJJaOtGVqiobZ9rr19HweYUwTbToy1Yw8+VN47BMHMbA/3MWKOmDPu1XKHcWOT3kxo+IhQUuG4OQmzYPm6InzPo6dkeOzInbEiV8QmWaY5HaIEc/cP3nCCMQ/uXZSG6IqTJOTGYBLwLvo2v3w8I/w9J+6isnbmTiK9+cDdiE5kshOM1/DtbsMb6UNLO/XvBAnNLbpEF5isS+Qteqk9ff+I9PfopqZLCfDOXJlX5qJpy5h4RDNTN9vu28nx/7Sszwy3jFmRsaQJAauT9Q19qf0nPCP9Gk4FUDuZwO/MV9ar8v11CAgSE1dtFOIZkT/WSNUbjRuU0r/75lRYwBu4RH6qZBgy/TK/13ZrrapX5q8+uHz2HeCXiKsM1WG2SY5yKkPfYNrbdu+jhcwbiTCrqgdewC8eLLqxL1Owx/nxVfUU5dFDG4c/nOhSPbnB6HZjz/XQZmZ9usLNDJwnOje22rauvhWigzJ9Mer58RvyArcGnpHqz2DyVtmqaZat22f04aQ3s/tcUamM4faa9kmG9V2qLL2v/wUAAP//uWniapfIbkAAAAAASUVORK5CYII=', width:7360,height:4912},{src:'/photos/pete2.webp',alt:'pete2',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAIAAACBclo5AAAEO0lEQVR4nHxWYZbEJg+zbPYM30G+f73/qbqD3SfZkExf2zyWsJMEWUYWrD/+/z8zqAUbwmwZAhoDDgQ7d3e4WzgiLAIr7CdsLfwEftg72/KfCLYVP75WxIoIj+Xh7gHOAQAGL7Nu/3KBIVl3+uf1739d9c9z3h+X1czZd96g54zLTsMbG3gHMa/UDfQFQEqiVVUKpYC+2Uq9zdcLdzYYcDC6dyXd9QNsHhwk1Omr1N9QqqF7WPy0itTKVhbEEBN94cnnRTU4B7xmiQw35QfGBWnELns3gr1undCVKYihwlvZGet3oh6ujnvZufHrF7Y373yAa3qmOM2cnAEynk+Fcak3sNuTZKE6B48ATqrraVmWNpAcs5X3X3ohhVDrk7NmfrUxfDh+o36RHok1KpOUhiRqY6MhS+C8C1m/KeKytVNJaxm7klZa6VLRNenJtndWYE+We43rwnNuVFrCUn31laYnqPPp2smbd/xp7iPy2wTZ+rL3Ej90b4aba9qG+WBzVdMy3T2tXJXVjD8KuLSkfNA6PKL2FhcH9gjwiUoyFlEQEgnb9Y0KzZlZjkqINKHXJ00kLZ0rcMrevkkbuqKOmhhph5i4TrChnNmDyrdSWvNTzmIMrXElpy3v98rMvlAH+4r4pESoVl40u1R9chJsK5fRJyobdUjz5TERA4EZo48K7FgN1+3lSTaLiXZhQiekU00kRZJ07zawbRXAJV0v0tIxDUQgDObWfCu7sWvGY8EMlhXyPJABewfTOiFpMR5tD+N2Zcw0S1UOdS27Xr3j83WcvtoIVBWdXSjUNoGxRvOiFILpQMInvsNF+RqLWiy649KytLobynvQZmsKPxkdRrFqU4fcu02MiZpgFZ16UxX1ViAtLtiWxtsjHV14FL5/uW2nBHIovqE0qm8hRCvqojIvLkF5jQBee7xheX3kR8H0SWeoelIs10HadfRG3dMrXdwdKOVSqrf5ZsW6BIsr2QvZNrTcfkW0hrENdk0FyJV4k+EZmW+jS+yqrcyQjlsG87gNm0mOdNlkKajBvVbrNBC3XxnTjwsVFZ1Iq2ypsxgxjkKWVY36qdyvyaPlZL7ItTKX6Poxwnt+mcPECnyOPzDhoptHZdknCv07dDOLqNnAubu6yY9mGIjtwSSHDHL24mvBOEbMVLcx/YrxB7ZmgaurRzsLeq8V3ayduTM/altbA+t4mZunL+YhenVj6vcckvA6cAhYCwtS3xjdTF2V1NMRNN3M3Du3rk/ubZvAwSIV3ayoZNZCX5wT7KV7DlTL5/RigtxTJi1nyKJMOebmwz2GsAT88MrPrp3YHtTm9pVEdcpAq3/T/BTSnCF8HdRuCXtq6fiXyiurG7NM7J2fz96/n/otECbcK7Kaa64vus82e6nbwvs0jBfqgTyn5K6vLmxdXOdNkeFPem46MywP/v68/mYd3f4KAAD//5mZC6iqMcOGAAAAAElFTkSuQmCC', width:8112,height:5408},{src:'/photos/bug.webp',alt:'bug',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAIAAACtROKYAAAA6ElEQVR4nByMa0ojQBAG+/F19zw2IQu7ZFkUz+ENPITX9hIihAQS1MxMS1I/i6Lw8vr4dR3vp+Pb4ULfxLv/z//+PPzd7rbhltfxeb4cT+cPiEIWAUF+IcYOosoiJExMfEdYACs1Mdqip6TDoH1DDbF7rUpJCjP3gtKqzjlV96a/59pEbDpqkXA1kC4sDtKO9quMNSUUReda1XzTrXe0qgZOohirDkLtNhO4ihfNzAC21XtDr+omzLKSx1SUipUJYxtKRAHtxVu7/cIFIkScCZhLZrKQ6k05NAo8NEJLiGkKC9P6CQAA//8pckfAOUO3DgAAAABJRU5ErkJggg==', width:2656,height:1773},{src:'/photos/porsche.webp',alt:'porsche',placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAAB5UlEQVR4nHyWYZbjIAyDCabtmXr/YxXifa06WkVmxj/ykhT4sGSTjufz2Vo7PtE/wRvcH8eBAZnZWsvM8yfWWrjOOdc1Ton8RGutt2vgrQV5fLTgtjRscGtt6OqZyUF1KJJD6Evbk01Hcnh0WMWomBx2nid0Xmt1CfVircVZ2OIAtveuPO66qkTngIyItRauc87eO66YBR4sfMMwGTutmfXeI4KTuQ/qqWXCROec3CJX+2am843EiAjyVJnMJCwikBbi9XpxtbXWG1brYktifuoflWQDWDWqHed5juqQweInrPPUObjwWzVx/cGf+y7AUJg6obCatFnzzgxmHMcR1zCeVgoXtZ5TIzXYcON2u6H0VTHjWSfp6szJYHZQbWDmkEmndtKS3rtqqOsQhuzfsPv9DvLfFbE9n7YHm4IjApmh/8bj8bDDQutiW4H2EdhSMTEzI+J/UzMz5dlXpp6cWmxbh7CCvrnAtlJY7RnJql9NUiRXuMCoQ/2GVdH0W2r5afloX39hFuZEzclkVD01M/A4+Fv6VRxd67durc2rN1WeMcbQflQbtnLp1Uh/tMQXhtKse8fpsK06eqMD6uq1NQf7zqS3Y6nCtBz0aNcqM+TAA0ZTPSNZ6pYcf61/luz+XwAAAP//guQVg4/ly70AAAAASUVORK5CYII=', width:7202,height:4801}];

	const { count = photoData.length }: { count?: number } = $props();

	let verticalCount = $state(3);
	let photos: Photo[] = $state(photoData);
	let innerWidth = $state(0);

	function reorderPhotos(photos: Photo[], verticalCount: number): Photo[] {
		const horizontals = photos.filter((photo) => photo.width > photo.height);
		const verticals = photos.filter((photo) => photo.width <= photo.height);
		const ordered: Photo[] = [];
		let h = 0,
			v = 0;

		while (h < horizontals.length || v < verticals.length) {
			if (h < horizontals.length) {
				ordered.push(horizontals[h++]);
			}
			for (let i = 0; i < verticalCount; i++) {
				if (v < verticals.length) {
					ordered.push(verticals[v++]);
				}
			}
			if (h < horizontals.length) {
				ordered.push(horizontals[h++]);
			}
		}
		return ordered;
	}

	$effect(() => {
		if (innerWidth >= 560 && verticalCount != 3) {
			verticalCount = 3;
			photos = photoData;
		} else if (innerWidth < 560 && verticalCount != 2) {
			verticalCount = 2;
			photos = reorderPhotos(photoData, verticalCount);
		}
	});
</script>

<svelte:window bind:innerWidth />
<div class="photos">
	{#each photos.slice(0, count) as photo}
		<div class="photo {photo.width > photo.height ? 'horizontal' : 'vertical'}">
			<Image src={photo.src} placeholder={photo.placeholder} alt={photo.alt} />
		</div>
	{/each}
</div>

<style>
	.photos {
		display: flex;
		flex-wrap: wrap;
		gap: 3px;
	}

	.photo.horizontal {
		flex: 0 0 calc(50% - 3px);
	}

	.photo.vertical {
		flex: 0 0 calc(25% - 3px);
	}

	@media (max-width: 560px) {
		.photo.horizontal {
			flex-basis: calc(70% - 3px);
		}

		.photo.vertical {
			flex-basis: calc(30% - 3px);
		}
	}
</style>

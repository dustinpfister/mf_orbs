var Orb = (function () {

    // set orb values by a given ratio, and level
    var setByRatio = function (ratio, level) {

        var self = this;

        // set level, and ratio to given values
        this.level = level || 1;
        this.ratio = ratio || [1, 0, 0, 0];

        // find points
        this.points = [];
        this.ratio.forEach(function (pt, i) {

            self.points[i] = pt * level;

        });

    };

    // set orb values based on a given points array
    var setByPoints = function (points) {

        var self = this;

        this.points = points;
        this.ratio = [];
        this.level = Infinity;

        // the lowest point is the level
        this.points.forEach(function (pt, i) {

            if (pt < self.level && pt > 0) {

                self.level = pt;

            }

        });

        // find the ratio from points
        this.points.forEach(function (pt, i) {

            self.ratio[i] = pt / self.level;

        });

    };

    // the Orb constructor
    var Orb = function (opt) {

        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;

        if (opt.points) {

            setByPoints.call(this, opt.points);

        }

        if (opt.ratio) {

            setByRatio.call(this, opt.ratio, opt.level);

        }

        // if just calling new Orb()
        if (!opt.points && !opt.ratio) {

            setByPoints.call(this, [1, 0, 0, 0]);

        }

    };

    return Orb;

}
    ());
